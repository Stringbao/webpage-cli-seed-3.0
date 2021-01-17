import "@css/pc/pcRegister.scss";
import Engine from "@src/main/Engine.js";

//develpoment环境下需要执行该方法, 生产环境无需执行
if(!$PRODUCTION){
    Engine.init(flash_fe_core_tool.$CONSTANT.TERMINAL.PC);
}

export default Engine;