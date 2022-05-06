<template>
  <div style="color: #606266">
    <el-row :gutter="20" style="margin-left: 0px; margin-right: 0px">
      <el-col :span="2" style="margin-top: 15px">
        <el-button
          type="primary"
          plain
          size="small"
          @click="insertpermit = true"
          >添加学生信息</el-button
        >
        <el-dialog
          title="添加学生信息"
          :visible.sync="insertpermit"
          class="stu-input"
        >
          <el-form
            status-icon
            :model="add_form"
            :rules="add_rules"
            ref="add_form"
          >
            <el-form-item
              label="学生ID"
              :label-width="formLabelWidth"
              prop="stu_id"
            >
              <el-input v-model.number="add_form.stu_id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="学生姓名"
              :label-width="formLabelWidth"
              prop="stu_name"
            >
              <el-input
                v-model="add_form.stu_name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="学生性别"
              :label-width="formLabelWidth"
              prop="stu_sex"
            >
              <el-select v-model="add_form.stu_sex" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="所在院系"
              :label-width="formLabelWidth"
              prop="stu_class"
            >
              <el-input
                v-model="add_form.stu_class"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="所在专业"
              :label-width="formLabelWidth"
              prop="stu_major"
            >
              <el-input
                v-model="add_form.stu_major"
                autocomplete="off"
              ></el-input>
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
      <el-col :span="22" style="margin-top: 15px">
        <div style="float: right" class="stu-search">
          <el-input
            v-model="keywords"
            placeholder="请输入学生名搜索"
            style="width: 200px"
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
                  title="修改学生信息"
                  :visible.sync="updatepermit"
                  class="stu-input"
                >
                  <el-form :model="form" ref="form" :rules="update_rules">
                    <el-form-item
                      label="所在院系"
                      :label-width="formLabelWidth"
                      prop="stu_class"
                    >
                      <el-input
                        v-model="form.stu_class"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      label="所在专业"
                      :label-width="formLabelWidth"
                      prop="stu_major"
                    >
                      <el-input
                        v-model="form.stu_major"
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
            class="stu-input"
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
  name: "Student",
  data() {
    return {
      keywords: "", // 搜索的关键字
      tableData: [],
      currentPage: 1,
      pagesize: 8,

      tablelabel: {
        stu_id: "学生ID",
        stu_name: "学生名",
        stu_sex: "性别",
        stu_class: "院系",
        stu_major: "专业",
      },
      updatepermit: false,
      insertpermit: false,
      formLabelWidth: "120px",
      form: {
        stu_id: "",
        stu_class: "",
        stu_major: "",
      },
      delete_stu_id: "",
      add_form: {
        stu_id: "",
        stu_name: "",
        stu_sex: "",
        stu_class: "",
        stu_major: "",
      },
      list: [],
      update_index: "",
      add_rules: {
        stu_id: [
          { required: true, message: "请输入学生ID" },
          { type: "number", message: "学生ID必须为数字" },
        ],
        stu_name: [
          { required: true, message: "请输入学生名", trigger: "blur" },
        ],
        stu_sex: [
            { required: true, message: "请选择性别", trigger: 'change' }
        ],
        stu_class: [
          { required: true, message: "请输入学生院系", trigger: "blur" },
        ],
        stu_major: [
          { required: true, message: "请输入学生专业", trigger: "blur" },
        ],
      },
      update_rules: {
        stu_class: [
          { required: true, message: "请输入学生院系", trigger: "blur" },
        ],
        stu_major: [
          { required: true, message: "请输入学生专业", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    get_tableData() {
      this.$axios
        .get("http://127.0.0.1:8000/sims_app/select_stu/")
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
      this.form.stu_id = row.stu_id;
      this.update_index = index;
    },
    handleDelete(row, index, rows) {
      this.delete_stu_id = row.stu_id;
      this.$confirm("此操作将永久删除学生信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          rows.splice(index, 1);
          this.$axios.post("http://127.0.0.1:8000/sims_app/delete_stu/", {
            stu_id: this.delete_stu_id,
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
            .post("http://127.0.0.1:8000/sims_app/update_stu/", {
              stu_id: this.form.stu_id,
              stu_class: this.form.stu_class,
              stu_major: this.form.stu_major,
            })
            .then((response) => {
              if (response.data.code == 200) {
                this.tableData[this.update_index].stu_class =
                  this.form.stu_class;
                this.tableData[this.update_index].stu_major =
                  this.form.stu_major;
                this.update_index = "";
                this.form = { stu_id: "", stu_class: "", stu_major: "" };
                this.success();
              } else {
                this.$message({
                  message: "存在字段未输入，请重新尝试！",
                  center: true,
                  type: "error",
                });
                this.form = { stu_id: "", stu_class: "", stu_major: "" };
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
            .post("http://127.0.0.1:8000/sims_app/insert_stu/", {
              stu_id: this.add_form.stu_id,
              stu_name: this.add_form.stu_name,
              stu_sex: this.add_form.stu_sex,
              stu_class: this.add_form.stu_class,
              stu_major: this.add_form.stu_major,
            })
            .then((response) => {
              if (response.data.code == 200) {
                this.tableData.unshift(this.add_form);
                this.add_form = {
                  stu_id: "",
                  stu_name: "",
                  stu_sex: "",
                  stu_class: "",
                  stu_major: "",
                };
                this.insert_success();
              } else if (response.data.code == 405) {
                this.$message({
                  message: "学生id已存在，添加失败，请重新尝试！",
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
        return item.stu_name.indexOf(this.keywords) !== -1;
      });
      console.log(this.list);
    },
  },
  mounted() {
    this.get_tableData(); //在页面挂载后调用此方法，确保数据与页面发生了交互
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
.stu-input .el-input__inner {
  color: #606266;
}
.stu-search .el-input__inner {
  background-color: #fff;
  color: #606266;
}
</style>