import React from "react";
import { Dispatch } from "redux";
import { showSpinner, hideSpinner } from "./spinnerReducer/spinnerReducer";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		showSpinner: () => dispatch(showSpinner()),
		hideSpinner: () => dispatch(hideSpinner())
	}
}
export type AddSpinnerProps = ReturnType<typeof mapDispatchToProps>;

export const addSpinner = <P extends object>(Comp: React.ComponentType<P & AddSpinnerProps>) => {
	const Container = connect(null, mapDispatchToProps)(Comp);
	return Container;
}