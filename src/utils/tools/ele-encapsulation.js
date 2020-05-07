import {Loading} from "element-ui";


/*
*   加载数据标识
* */
let loading;
export function eleLoading() {
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}
export function closeEleLoading() {
  loading.close();
}
