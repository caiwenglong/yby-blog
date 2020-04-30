import {
  MessageBox,
  Message
} from 'element-ui';
export function encMessage(objMsg) {
  const defaultMsg = {
    cfmType: 'warning',
    cfmInfo: '提示信息',
    cfmTitle: '提示',
    cfmButtonText: '确定',
    cancelButtonText: '取消',
    cfmMsgType: 'success',
    cfmMsgInfo: '删除成功!',
    cancelMsgType: 'info',
    cancelMsgInfo: '已取消删除!'
  };
  objMsg = Object.assign(defaultMsg, objMsg);
  MessageBox.confirm(objMsg.cfmInfo, objMsg.cfmTitle, {
    cfmButtonText: objMsg.cfmButtonText,
    cancelButtonText: objMsg.cfmButtonText,
    type: objMsg.cfmType
  }).then(() => {
    Message({
      type: objMsg.messageType,
      message: objMsg.cfmMsgInfo
    });
  }).catch(() => {
    Message({
      type: objMsg.cancelMsgType,
      message: objMsg.cancelMsgInfo
    });
  });
}
