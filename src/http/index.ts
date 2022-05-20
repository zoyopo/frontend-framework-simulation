/**
 * @title: index
 * @projectName frontend-framework-simulation
 * @description: TODO
 * @author zhangyunpeng0126
 * @date 2022/5/2016:34
 */
import Client from "./Client";
import {Package} from './HttpTransmission'

let _package: Package = {synNum: 1}
let client = new Client()
client.shakeHandRequest(_package)