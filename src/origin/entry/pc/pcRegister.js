import "@css/pc/pcRegister.scss";
import Engine from "@services/register.js";
import PCRegister from "@vpc/Register.js";

let _engine = new Engine();
window.$engine = _engine;
//develpoment环境下需要执行该方法, 生产环境无需执行
if(!$PRODUCTION){
    // _engine.init(flash_fe_core_tool.$CONSTANT.TERMINAL.PC, $(".rectangle-copy"));
    _engine.show(new PCRegister($(".rectangle-copy")));
}

export default _engine;