//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import Page from '../../components/public/page'
import Loadable from "react-loadable";
import { Spin } from "antd";
import { historyType } from "../../utils/flow";
import { dispatchProps } from "../../utils/defaultProps";
import { Route, Switch } from "react-router-dom";
import { getRoutes } from "../../utils";

const RefundListHeader = Loadable({
    loader: () => import('../../components/order/refundListHeader'),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    },
})
const RefundListTable = Loadable({
    loader: () => import('../../components/order/refundListTable'),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    },
})
type Props = {
    history: historyType,
    routerData: {},
    dispatch: dispatchProps,
    location: { state: { type: string, record: {} }, search: string, pathname: string },
    match: { url: string, path: string }
}
type State = {}

@connect()
export default class Refund extends Component<Props, State> {

    render() {
        const { match, routerData } = this.props;
        const routes = getRoutes(match.path, routerData);
        return (
            <Switch>
                {routes.map((item) => {
                    return <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
                })}
                <Route key="/refund" render={() => (
                    <Page>
                        <RefundListHeader {...this.props} />
                        <RefundListTable {...this.props} />
                    </Page>
                )} />
            </Switch>
        )
    }
}
