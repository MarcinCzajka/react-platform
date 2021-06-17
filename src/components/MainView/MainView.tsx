import React from 'react';
import SessionContext from '../../contexts/SessionContext';
import { getMediaList } from './mediaListApi';
import MediaList from './MediaList/MediaList';
import './MainView.scss';

type MyState = {
    isReady: boolean;
    triedToFetch: boolean;
    listsToFetch: number[];
    mediaLists: any[];
}

type MyProps = {
    onReady: () => void
}

class MainView extends React.Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props);

        this.state = {
            isReady: false,
            triedToFetch: false,
            listsToFetch: [10, 13, 15],
            mediaLists: []
        }

        //Allow use of context outside of render function
        //stackoverflow.com/questions/49809884/access-react-context-outside-of-render-function
        MainView.contextType = SessionContext;
    }

    componentDidUpdate() {
        //wait for bearer token to apper on context to fetch Media
        if (!this.state.triedToFetch && this.context?.token) this.fetchMediaList();
    }

    fetchMediaList() {
        this.setState({
            triedToFetch: true
        })

        const fetchedLists: unknown[] = [];

        const { listsToFetch } = this.state;

        const requestCount = this.waitForAllrequests(listsToFetch.length, () => {
            this.setState({
                mediaLists: fetchedLists
            })

            this.props.onReady();
        });

        for (const listId of listsToFetch) {
            getMediaList(this.context.token, listId, 0, 15)
                .then(responseData => {
                    fetchedLists.push({data: responseData, title: `List ${listId}`})
                })
                .catch(err => {

                })
                .finally(() => {
                    requestCount.next();
                })
        }
    }

    waitForAllrequests = function* (nrOfRequests: number, callback: () => void) {
        for (let i = 1; i < nrOfRequests; i++) {
            yield i
        };
        
        callback();
    }

    render() {
        const listsToRender = this.state.mediaLists;

        return (
            <section className="mainView">
                {listsToRender.map((entities, index) => <MediaList key={index} listTitle={entities.title} entities={entities.data} /> )}
            </section>
        )
    }
}

export default MainView;