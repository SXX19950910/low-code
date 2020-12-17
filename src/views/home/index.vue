<template>
  <div class="yl-design-warp">
    <template v-if="$route.name !== 'DesignEdit'">
      <div class="header-area">
        <div class="left-logo">
          <span class="first-font">云搭</span>
          <span class="describe">云路低代码开发平台</span>
        </div>
      </div>
      <div v-if="$route.name === 'Design'" class="content-area">
        <div class="create-box">
          <i class="el-icon-circle-plus-outline" />
          <span>创建模板</span>
          <div class="select-box">
            <div class="left" @click="handleGoCreate">
              <span>全新创建</span>
            </div>
            <div class="right" @click="handleGoTemplate">
              <span>选择模板</span>
            </div>
          </div>
        </div>
      </div>
      <router-view />
    </template>
    <router-view v-else />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleGoCreate() {
      this.$router.push({ name: 'DesignEdit' })
    },
    handleGoTemplate() {
      this.$router.push({ name: 'DesignTemplate' })
    }
  }
}
</script>

<style lang="scss">
.yl-design-warp {
  height: 100%;
  .header-area {
    background-color: #0079F2;
    height: 60px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    .first-font {
      font-size: 24px;
      color: white;
      font-weight: bold;
      font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    }
    .describe {
      margin-left: 5px;
      font-size: 14px;
      color: rgba(255, 255, 255, .6);
    }
  }
  .content-area {
    width: 1000px;
    display: flex;
    align-items: center;
    margin: 30px auto;
    .create-box {
      height: 162px;
      width: 25%;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
      transition: .3s ease all;
      border-radius: 4px;
      position: relative;
      overflow: hidden;
      &:hover {
        box-shadow: 0 1px 4px 0 rgba(136,136,136,.3);
        .select-box {
          top: 0;
          opacity: 1;
        }
      }
      .el-icon-circle-plus-outline {
        font-size: 48px;
      }
      span {
        font-size: 14px;
        margin-top: 5px;
      }
      .select-box {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        background-color: white;
        z-index: 1;
        padding: 15px 0;
        transition: .4s ease all;
        opacity: 0;
        .left, .right {
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            span {
              text-decoration: underline;
            }
          }
        }
        .left {
        }
      }
    }
  }
}
</style>
