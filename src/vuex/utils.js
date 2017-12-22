/**
 * 常用工具包
 */

class Utils {

  // 消息数量
  static message_count() {
    return localStorage.getItem('message_count') || 0
  }

  // 来源平台
  static platform() {
    return localStorage.getItem('platform') || 1
  }

  // 是否为移动端
  static is_mobile () {
    const user_agent = navigator.userAgent;
    const mobile_agents = ['Android', 'iPhone', 'Symbian', 'WindowsPhone', 'iPod', 'BlackBerry', 'Windows CE'];
    let is_mob = false;

    for (let i = 0; i < mobile_agents.length; i++) {
      if (user_agent.indexOf(mobile_agents[i]) > -1) {
        is_mob = true;
        break;
      }
    }

    return is_mob
  }
}

export default Utils
