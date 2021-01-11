import "@css/pc/pcRegister.scss";
import Engine from "@src/main/Engine.js";
import PCRegister from "@vpc/Register.js";

//develpoment环境下需要执行该方法, 生产环境无需执行
if(!$PRODUCTION){
    // _engine.init(flash_fe_core_tool.$CONSTANT.TERMINAL.PC, $(".rectangle-copy"));
    Engine.show(new PCRegister($(".rectangle-copy")));
}

export default Engine;