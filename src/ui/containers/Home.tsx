import { connect } from "react-redux";
import { reduxForm, focus } from "redux-form";
import { Dispatch } from "redux";

import { Home } from "../screens";
import { isRequired } from "../../utils";

import { getCronHumanExpression } from "../../core/adapters";

interface State {
  cronExpression: {
    humanExpression: string;
  };
}

interface CronConfigFormValues {
  cronExpression: string;
}

const mapStateToProps = (state: State) => ({
  humanExpression: state.cronExpression.humanExpression
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCronHumanExpression: (schedule: string) =>
    dispatch(getCronHumanExpression(schedule)),
  focusOnCronExpressionInput: () =>
    dispatch(focus("CronConfigForm", "cronExpression"))
});

const validate = (values: CronConfigFormValues) => ({
  cronExpression: isRequired(values.cronExpression)
});

const DecoratedHomeForm = reduxForm({
  form: "CronConfigForm",
  destroyOnUnmount: false,
  validate,
  initialValues: {
    cronExpression: "*/5 * * * *"
  }
})(Home);

export const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecoratedHomeForm);
