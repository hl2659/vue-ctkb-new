<template>
  <div style="width: 80%; flex: auto; margin: auto; padding: 10px">
    <div style="font-size: 32px; padding: 10px">
      <span><b>Cohort Definition</b> </span>
    </div>

    <ConditionSearchBox v-on:childObj="childObj"/>

    <el-container style="width: 80%; margin: auto; padding: 10px; display: flex; flex-direction: column;">
      <el-card style="width: 100%">
        <div style="flex: auto">
          <span>Inclusion Criteria for {{ this.conditionName }}: </span>
        </div>

        <el-table
            v-loading="inloading"
            ref="multipleTableInc"
            :data="inCriteria | pagination(currentPage1,pageSize1)"
            tooltip-effect="dark"
            stripe
            style="width: 100%"
            max-height="350"
            :row-key="getRowKey"
            @selection-change="handleIncSelectionChange">
          <el-table-column
              type="selection"
              width="55"
              :reserve-selection="true"
          >
          </el-table-column>
          <el-table-column
              prop="id"
              label="ID"
              sortable
              width="120">
          </el-table-column>
          <el-table-column
              prop="criteriaConceptName"
              label="Concept Name"
              sortable
          >
          </el-table-column>
          <el-table-column
              prop="criteriaConceptId"
              label="Concept ID"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="criteriaDomain"
              label="Domain"
              sortable
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="conceptCount"
              label="Frequency"
              sortable
              show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleIncSizeChange"
            @current-change="handleIncCurrentChange"
            :current-page="currentPage1"
            :page-sizes="[10, 20, 50]"
            :page-size="pageSize1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="intotal">
        </el-pagination>
        <div style="margin-top: 20px; display: flex">
          <!--                    <el-button @click="toggleSelectionInc([inCriteria[1], inCriteria[2]])">Check 2 and 3</el-button>-->
          <el-button type="warning" @click="toggleSelectionInc()">Unselect All</el-button>
        </div>


      </el-card>

      <el-card style="width: 100%; margin-top: 10px">
        <div style="flex: auto">
          <span>Exclusion Criteria for {{ this.conditionName }}: </span>
        </div>

        <el-table
            v-loading="exloading"
            ref="multipleTableExc"
            :data="exCriteria | pagination(currentPage2,pageSize2)"
            tooltip-effect="dark"
            stripe
            style="width: 100%"
            max-height="350"
            :row-key="getRowKey"
            @selection-change="handleExcSelectionChange">
          <el-table-column
              type="selection"
              width="55"
              :reserve-selection="true"
          >
          </el-table-column>
          <el-table-column
              prop="id"
              label="ID"
              sortable
              width="120">
          </el-table-column>
          <el-table-column
              prop="criteriaConceptName"
              label="Concept Name"
              sortable
          >
          </el-table-column>
          <el-table-column
              prop="criteriaConceptId"
              label="Concept ID"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="criteriaDomain"
              label="Domain"
              sortable
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="conceptCount"
              label="Frequency"
              sortable
              show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleExcSizeChange"
            @current-change="handleExcCurrentChange"
            :current-page="currentPage2"
            :page-sizes="[10, 20, 50]"
            :page-size="pageSize2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="extotal">
        </el-pagination>
        <div style="margin-top: 20px; display: flex">
          <!--                    <el-button @click="toggleSelectionExc([exCriteria[1], exCriteria[2]])">Check 2 and 3</el-button>-->
          <el-button type="warning" @click="toggleSelectionExc()">Unselect All</el-button>
        </div>
      </el-card>


      <el-row style="margin-top: 20px; display: flex">
        <el-button plain type="primary" icon="el-icon-edit" @click="toCriteriaList()">Show selected criteria</el-button>
        <el-button plain type="success" icon="el-icon-check" @click="downloadJson()">Generate Json</el-button>
      </el-row>

    </el-container>

    <router-view/>
  </div>
</template>

<script>
import ConditionSearchBox from '../components/conditionpage/ConditionSearchBox'
import axios from 'axios'
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import storage from "../storage/storage"

export default {
  name: "SeachCondition",
  components: {
    ConditionSearchBox,
  },
  data() {
    return {
      conditionId: '',
      conditionName: '',
      multipleSelection1: [],
      multipleSelection2: [],
      currentPage1: 1,
      pageSize1: 10,
      currentPage2: 1,
      pageSize2: 10,
      inCriteria: [],
      exCriteria: [],
      intotal: 40,
      extotal: 40,
      inloading: true,
      exloading: true,
      domain: '',

    }
  },
  created() {
    this.getRouterData();
    this.conditionId = this.getConditionId();
    this.getCriteriaByConditionID(this.conditionId, 1, '');
    this.getCriteriaByConditionID(this.conditionId, 0,'');
  },
  computed: {
    conditionChange() {
      return this.$store.state.conditionId;
    },
    ...mapGetters(['getCondition', 'getConditionID']),
  },
  watch: {
    conditionChange(val, oldVal) {
      console.log('condition id updated to: ' + val + ' from ' + oldVal);
      this.conditionId = this.$store.state.conditionId;
      this.conditionName = this.$store.state.condition;
      console.log('update table to condition id: ' + this.conditionId);
      this.inloading = true;
      this.exloading = true;
      this.getCriteriaByConditionID(this.conditionId, 1, this.domain);
      this.getCriteriaByConditionID(this.conditionId, 0, this.domain);
    },
  },
  filters: {
    pagination(tabledata, pageNum, pagesize) {
      let offset = (pageNum - 1) * pagesize;//当前页第一条的索引
      let data = (offset + pagesize >= tabledata.length) ? tabledata.slice(offset, tabledata.length) : tabledata.slice(offset, offset + pagesize);
      return data;
    }
  },
  methods: {
    getRowKey(row) {
      return row.id
    },
    childObj(conceptId, domain) {
      // childValue is value passed by child component
      this.conditionId = conceptId;
      this.domain = domain;
      console.log("get concept id " + this.conditionId);
      console.log("get domain value " + this.domain);
      this.getCriteriaByConditionID(this.conditionId, 1, this.domain);
      this.getCriteriaByConditionID(this.conditionId, 0, this.domain);
    },
    ...mapMutations(['updateCondition', 'updateConditionID']),
    getRouterData() {
      const param = this.$route.params;
      if (param.condition != null && param.conditionId != null) {
        console.log("Param Condition: " + param.condition) //{condition}
        console.log("Param Condition id: " + param.conditionId) //{condition}
        this.conditionName = param.condition;
        this.conditionId = param.conditionId;
        storage.set('conditionId', this.conditionId);
        storage.set('conditionName', this.conditionName);
      }
      return this.conditionId;
    },
    getConditionId() {
      if (Boolean(this.conditionId)) {
        console.log("get existing condition id: " + this.conditionId);
        this.updateConditionID(this.conditionId);
        this.updateCondition(this.conditionName);
        storage.set('conditionId', this.conditionId);
        console.log('local storage changes to:' + storage.get('conditionId'));
      } else {
        if (storage.get('conditionId').length > 0) {
          console.log("get local stored condition id: " + storage.get('conditionId'));
          this.conditionId = storage.get('conditionId');
          this.conditionName = storage.get('conditionName');
          this.updateConditionID(this.conditionId);
          this.updateCondition(this.conditionName);
        } else {
          this.conditionId = '201826';
          this.conditionName = 'Diabetes mellitus, Type 2';
          console.log('set default id to: ' + this.conditionId);
          console.log('set default condition to: ' + this.conditionName);
          this.updateConditionID(this.conditionId);
          this.updateCondition(this.conditionName);
          storage.set('conditionId', this.conditionId);
          storage.set('conditionName', this.conditionName);
          console.log('local storage changes to default: ' + storage.get('conditionId'));
          console.log('local storage changes to default: ' + storage.get('conditionName'));
        }
      }
      return this.conditionId;
    },
    getCriteriaByConditionID(conditionid, include, domain) {
      console.log("Search condition: " + conditionid);
      console.log("Domain: " + domain);
      if (conditionid != null) {

        if(domain == 'All' || domain == ''){
        axios.get(this.$apiUrl + "/common-condition/get-criteria-id/" + conditionid + "/" + include)
            .then(response => {
              // console.log(response);
              // console.log(response.data.slice(1,20));

              if (include == 1) {
                this.inCriteria = response.data;
                this.intotal = response.data.length;
                this.inloading = false;
              } else {
                this.exCriteria = response.data;
                this.extotal = response.data.length;
                this.exloading = false;
              }
            })
            .catch(function (err) {
              console.log(err);
            })
        }else{
          axios.get(this.$apiUrl + "/common-condition/get-criteria-id/" + conditionid + "/" + include + "/" + domain)
              .then(response => {
                // console.log(response);
                // console.log(response.data.slice(1,20));

                if (include == 1) {
                  this.inCriteria = response.data;
                  this.intotal = response.data.length;
                  this.inloading = false;
                } else {
                  this.exCriteria = response.data;
                  this.extotal = response.data.length;
                  this.exloading = false;
                }
              })
              .catch(function (err) {
                console.log(err);
              })
        }
      }
    },
    toggleSelectionInc(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTableInc.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTableInc.clearSelection();
      }
    },
    toggleSelectionExc(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTableExc.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTableExc.clearSelection();
      }
    },
    handleIncSelectionChange(val) {
      this.multipleSelection1 = val;
      console.log(this.multipleSelection1);
    },
    handleExcSelectionChange(val) {
      this.multipleSelection2 = val;
      console.log(this.multipleSelection2);
    },
    handleIncSizeChange(val) {
      this.pageSize1 = val;
      console.log(`Each page ${val} record`);
    },
    handleIncCurrentChange(val) {
      console.log(`Current Page: ${val}`);
      this.currentPage1 = val;
    },
    handleExcSizeChange(val) {
      this.pageSize2 = val;
      console.log(`Each page ${val} record`);
    },
    handleExcCurrentChange(val) {
      console.log(`Current Page: ${val}`);
      this.currentPage2 = val;
    },
    toCriteriaList() {
      console.log(this.multipleSelection1);
      console.log(this.multipleSelection2);
      this.$router.push({
        name: 'CriteriaList',
        params: {
          inclist: this.multipleSelection1,
          exclist: this.multipleSelection2,
        },
      })
      // this.$router.push({path:'/criterialist'})
    },
    downloadJson(){
      var criList = this.multipleSelection1.concat(this.multipleSelection2);
      const data = JSON.stringify(criList);
      const blob = new Blob([data], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = "criteria_list.json";
      link.click();
      URL.revokeObjectURL(link.href);
    }

  },
  mounted() {
    window.onbeforeunload = function (e) {
      e = e || window.event;


      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        e.returnValue = 'Close Warning';
      }

      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return 'Close Warning';
    };
  }
}
</script>

<style scoped>

</style>