<template>
  <div>
    <header class="masthead text-white text-center">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-xl-9 mx-auto">
            <h1 class="mb-5">Support, Facilitate, and Improve your Clinical Trial Research!</h1>
          </div>
          <div class="col-md-10 col-lg-8 col-xl-7 mx-auto" style="justify-content: center">

            <el-form :inline="true" class="demo-form-inline">
              <el-form-item>
                <el-col>
                  <el-autocomplete
                      class="inline-input"
                      v-model="conditionName"
                      :fetch-suggestions="querySearch"
                      placeholder="e.g. Diabetes mellitus, Type 2"
                      :trigger-on-focus="false"
                      @select="handleSelect"
                  ></el-autocomplete>
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-button style="width: 140px; font-size: 20px" :disabled="isDisabled" :loading="isDisabled" type="primary" @click="onSubmit">Search</el-button>
              </el-form-item>
            </el-form>

            <!--                        <form>-->
            <!--                            <div class="form-row">-->
            <!--                                <div class="col-12 col-md-9 mb-2 mb-md-0">-->
            <!--                                      <input type="text" id="searchCondition" name="searchCondition"-->
            <!--                                             class="form-control form-control-lg"-->
            <!--                                             placeholder="Please input any conditions..."-->
            <!--                                              v-model = 'condition'>-->
            <!--                                </div>-->
            <!--                                <div class="col-12 col-md-3">-->
            <!--                                    <button type="submit" id="search" name="search"-->
            <!--                                            class="btn btn-block btn-lg btn-primary"-->
            <!--                                            @click="toSearch()">Search-->
            <!--                                    </button>-->
            <!--                                </div>-->
            <!--                            </div>-->
            <!--                        </form>-->
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import storage from "../../storage/storage";
import axios from "axios";

export default {
  name: "HomeHeader",
  data() {
    return {
      conditionName: '',
      conditionId: '',
      conditionList: [],
      isDisabled: false,
    }
  },
  computed: {
    ...mapGetters(['getCondition'])
  },
  methods: {
    ...mapMutations(['updateCondition', 'updateConditionID']),
    getAllConditionNames() {
      axios.get(this.$apiUrl + "/common-condition/get-all-condition-names")
          .then(response => {

            response.data.forEach(
                item => {
                  this.conditionList.push({"value": String(item)});
                });

          }).catch(function (err) {
        console.log(err);
      })
    },
    querySearch(queryString, cb) {
      if (queryString.length >= 2) {
        var links = this.conditionList;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        // call callback function to return suggestions
        cb(results);
      }

    },
    createFilter(queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.isDisabled = true;
      console.log(item.value);
      this.conditionName = item.value;
      axios.get(this.$apiUrl + "/common-condition/get-condition-id-by-name/" + item.value)
          .then(response => {
            console.log("got condition id: " + response.data);
            if (Boolean(response.data)) {
              this.conditionId = response.data;
            }
            this.isDisabled = false;
          }).catch(function (err) {
        console.log(err);
        this.isDisabled = false;
      })
    },
    onSubmit() {
      console.log("now condition changes to "+this.conditionName);
      console.log("now condition id changes to "+this.conditionId);

      storage.set('conditionId', this.conditionId);
      storage.set('conditionName', this.conditionName);
      console.log('submit!' + this.conditionId);
      this.updateCondition(this.conditionName);
      this.updateConditionID(this.conditionId);
      this.toSearch();
    },
    toSearch() {
      this.$router.push({name: 'SearchCondition', params:{condition: this.conditionName, conditionId: this.conditionId}});
    }
  },
  mounted() {
    this.getAllConditionNames();

  },
}
</script>

<style scoped>
h1, h2, h3, h4, h5, h6 {
  font-family: Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700
}

header.masthead {
  position: relative;
  background-color: #343a40;
  background: url('~@/assets/img/home_bkgd_1.jpg') no-repeat center center;
  background-size: cover;
  padding-top: 8rem;
  padding-bottom: 8rem
}

header.masthead .overlay {
  position: absolute;
  background-color: #212529;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: .3
}

header.masthead h1 {
  font-size: 2rem
}

@media ( min-width: 768px) {
  header.masthead {
    padding-top: 12rem;
    padding-bottom: 12rem
  }

  header.masthead h1 {
    font-size: 3rem
  }
}

/deep/ .el-input__inner{
  width: 440px;
  height: 47px;
}
</style>