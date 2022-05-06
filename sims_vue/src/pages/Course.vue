<template>
  <div>
    <el-row :gutter="20" style="margin-left: 0px; margin-right: 0px">
      <el-col :span="2" style="margin-top: 15px">
        <el-button
          type="primary"
          plain
          size="small"
          @click="insertpermit = true"
          >添加课程信息</el-button
        >
        <el-dialog
          title="添加课程信息"
          :visible.sync="insertpermit"
          class="cour-input"
        >
          <el-form
            status-icon
            :model="add_form"
            :rules="add_rules"
            ref="add_form"
          >
            <el-form-item
              label="课程ID"
              :label-width="formLabelWidth"
              prop="cour_id"
            >
              <el-input
                v-model.number="add_form.cour_id"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="课程名称"
              :label-width="formLabelWidth"
              prop="cour_name"
            >
              <el-input
                v-model="add_form.cour_name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="课程学分"
              :label-width="formLabelWidth"
              prop="credit"
            >
              <el-input v-model="add_form.credit" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="课程学时"
              :label-width="formLabelWidth"
              prop="period"
            >
              <el-input v-model="add_form.period" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button
              @click="
                insertpermit = false;
                insert_fail();
              "
              >取 消</el-button
            >
            <el-button type="primary" @click="insertobj('add_form')"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </el-col>
      <el-col :span="22" style="margin-top: 15px" class="cour-search">
        <div style="float: right">
          <el-input
            v-model="keywords"
            placeholder="请输入课程名搜索"
            style="width: 200px; color: #606266"
            plain
            size="small"
            @keyup.enter.native="search"
          ></el-input>
          <el-button-group>
            <el-button type="primary" @click="search" plain size="small"
              >搜索</el-button
            >
            <el-button type="primary" @click="clearkeyword" plain size="small"
              >清空</el-button
            >
          </el-button-group>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-left: 0px; margin-right: 0px">
      <el-col :span="24" style="margin-top: 15px">
        <el-card shadow="hover">
          <el-table
            :data="
              tableData.slice(
                (currentPage - 1) * pagesize,
                currentPage * pagesize
              )
            "
            style="width: 100%"
            border
            stripe
          >
            <el-table-column
              v-for="(val, key) in tablelabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="
                    updatepermit = true;
                    handleEdit(scope.$index, scope.row);
                  "
                  >编辑
                </el-button>
                <el-dialog
                  class="cour-input"
                  title="修改课程信息"
                  :visible.sync="updatepermit"
                >
                  <el-form :model="form" ref="form" :rules="update_rules">
                    <el-form-item
                      label="课程学分"
                      :label-width="formLabelWidth"
                      prop="credit"
                    >
                      <el-input
                        v-model="form.credit"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      label="课程学时"
                      :label-width="formLabelWidth"
                      prop="period"
                    >
                      <el-input
                        v-model="form.period"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </el-form>

                  <div slot="footer" class="dialog-footer">
                    <el-button
                      @click="
                        updatepermit = false;
                        fail();
                      "
                      >取 消</el-button
                    >
                    <el-button type="primary" @click="updateobj('form')"
                      >确 定</el-button
                    >
                  </div>
                </el-dialog>
                <el-button
                  size="mini"
                  type="danger"
                  @click.native.prevent="
                    handleDelete(scope.row, scope.$index, tableData)
                  "
                  >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="cour-input"
            style="margin-top: 15px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[4, 6, 8]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length"
          >
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Course",
  data() {
    return {
      keywords: "",
      tableData: [],
      currentPage: 1,
      pagesize: 8,

      tablelabel: {
        cour_id: "课程ID",
        cour_name: "课程名",
        credit: "学分",
        period: "学时",
      },
      updatepermit: false,
      insertpermit: false,
      formLabelWidth: "120px",
      form: {
        cour_id: "",
        credit: "",
        period: "",
      },
      delete_cour_id: "",
      add_form: {
        cour_id: "",
        cour_name: "",
        credit: "",
        period: "",
      },
      list: [],
      update_index: "",
      add_rules: {
        cour_id: [
          { required: true, message: "请输入课程ID" },
          { type: "number", message: "课程ID必须为数字" },
        ],
        cour_name: [
          { required: true, message: "请输入课程名", trigger: "blur" },
        ],
        credit: [
          { required: true, message: "请输入课程学分", trigger: "blur" },
        ],
        period: [
          { required: true, message: "请输入课程学时", trigger: "blur" },
        ],
      },
      update_rules: {
        credit: [
          { required: true, message: "请输入课程学分", trigger: "blur" },
        ],
        period: [
          { required: true, message: "请输入课程学时", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    get_tableData() {
      this.$axios
        .get("http://127.0.0.1:8000/sims_app/select_cour/")
        .then((response) => {
          this.tableData = response.data;
          this.list = response.data;
        });
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleEdit(index, row) {
      this.form.cour_id = row.cour_id;
      this.update_index = index;
    },
    handleDelete(row, index, rows) {
      this.delete_cour_id = row.cour_id;
      this.$confirm("此操作将永久删除课程信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          rows.splice(index, 1);
          this.$axios.post("http://127.0.0.1:8000/sims_app/delete_cour/", {
            cour_id: this.delete_cour_id,
          });
          this.$message({
            type: "success",
            center: true,
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            center: true,
            message: "已取消删除",
          });
        });
    },
    updateobj(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("http://127.0.0.1:8000/sims_app/update_cour/", {
              cour_id: this.form.cour_id,
              credit: this.form.credit,
              period: this.form.period,
            })
            .then((response) => {
              if (response.data.code == 200) {
                this.tableData[this.update_index].credit = this.form.credit;
                this.tableData[this.update_index].period = this.form.period;
                this.update_index = "";
                this.form = { cour_id: "", credit: "", period: "" };
                this.success();
              } else {
                this.$message({
                  message: "存在字段未输入，请重新尝试！",
                  center: true,
                  type: "error",
                });
                this.form = { cour_id: "", credit: "", period: "" };
              }
            });
          this.updatepermit = false;
        }
      });
    },
    insertobj(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("http://127.0.0.1:8000/sims_app/insert_cour/", {
              cour_id: this.add_form.cour_id,
              cour_name: this.add_form.cour_name,
              credit: this.add_form.credit,
              period: this.add_form.period,
            })
            .then((response) => {
              if (response.data.code == 200) {
                this.tableData.unshift(this.add_form);
                this.add_form = {
                  cour_id: "",
                  cour_name: "",
                  credit: "",
                  period: "",
                };
                this.insert_success();
              } else if (response.data.code == 405) {
                this.$message({
                  message: "课程id已存在，添加失败，请重新尝试！",
                  center: true,
                  type: "error",
                });
                this.add_form = {
                  stu_id: "",
                  stu_name: "",
                  stu_sex: "",
                  stu_class: "",
                  stu_major: "",
                };
              } else {
                this.$message({
                  message: "存在字段未输入，请重新尝试！",
                  center: true,
                  type: "error",
                });
                this.add_form = {
                  stu_id: "",
                  stu_name: "",
                  stu_sex: "",
                  stu_class: "",
                  stu_major: "",
                };
              }
            });
          this.insertpermit = false;
        }
      });
    },
    fail() {
      this.$message({
        message: "已取消修改！",
        center: true,
        type: "info",
      });
    },
    success() {
      this.$message({
        message: "修改成功！",
        center: true,
        type: "success",
      });
    },
    insert_fail() {
      this.$message({
        message: "已取消添加！",
        center: true,
        type: "info",
      });
    },
    insert_success() {
      this.$message({
        message: "添加成功！",
        center: true,
        type: "success",
      });
    },
    clearkeyword() {
      this.keywords = "";
    },
    search() {
      this.tableData = this.tableData.filter((item) => {
        return item.cour_name.indexOf(this.keywords) !== -1;
      });
    },
  },
  mounted() {
    this.get_tableData();
  },
  watch: {
    keywords() {
      if (this.keywords == "") {
        this.tableData = this.list;
      }
    },
  },
};
</script>

<style>
.cour-input .el-input__inner {
  color: #606266;
}
.cour-search .el-input__inner {
  background-color: #fff;
  color: #606266;
}
</style>