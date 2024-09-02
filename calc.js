import { CalcModel, CalcController, CalcView } from "./CalcMVC.mjs";

const calcView = new CalcView();
const calcModel = new CalcModel();
calcModel.registerView(calcView);
const calcController = new CalcController(calcModel);
calcView.registerController(calcController);
