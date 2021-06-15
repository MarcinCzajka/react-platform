import React from 'react';
import { SessionConsumer } from '../../contexts/SessionContext';
import './MainView.scss';

type MyState = {
    
}

type MyProps = {
    
}

class MainView extends React.Component<MyProps, MyState> {
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