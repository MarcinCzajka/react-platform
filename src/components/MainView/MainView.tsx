import React from 'react';
import SessionContext, { SessionConsumer } from '../../contexts/SessionContext';
import { getMediaList } from './mediaListApi';
import './MainView.scss';

type MyState = {
    isReady: boolean;
    wasListFetched: boolean;
}

type MyProps = {}

class MainView extends React.Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props);

        this.state = {
            isReady: false,
            wasListFetched: false
        }

        //Allow use of context outside of render function
        //stackoverflow.com/questions/49809884/access-react-context-outside-of-render-function
        MainView.contextType = SessionContext;
    }

    componentDidUpdate() {
        if (!this.state.wasListFetched && this.context?.token) this.fetchMediaList();
    }

    fetchMediaList() {
        getMediaList(this.context.token).then(entities => {
            console.log(entities)
        })
    }

    render() {
        return (
            <SessionConsumer>
                {sessionData => (
                    <div>
                        123
                    </div>
                )}
            </SessionConsumer>
        )
    }
}

export default MainView;