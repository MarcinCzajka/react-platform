import React from 'react';
import SessionContext from '../../contexts/SessionContext';
import { getMediaList, getMedia } from './mediaListApi';
import MediaList from './MediaList/MediaList';
import PlayerModal from './PlayerModal/PlayerModal';
import './MainView.scss';

type MyState = {
    isReady: boolean;
    triedToFetch: boolean;
    listsToFetch: number[];
    mediaLists: any[];
    displayMediaUrl?: any;
    displayMediaPoster?: string;
}

type MyProps = {
    onReady: () => void;
    showSplash: () => void;
}

class MainView extends React.PureComponent<MyProps, MyState> {

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

        this.displayMedia = this.displayMedia.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidUpdate() {
        //wait for bearer token to apper on context to fetch Media
        if (!this.state.triedToFetch && this.context?.token) this.fetchMediaList();
    }

    displayMedia(Id: number, poster = '') {
        this.props.showSplash();

        getMedia(this.context.token, Id, 'TRIAL').then(ContentUrl => {
            console.log(ContentUrl)
            this.setState({
                displayMediaUrl: ContentUrl,
                displayMediaPoster: poster
            })
        }).catch(err => {
            
        }).finally(() => {

            this.props.onReady();

        })
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

    hideModal() {
        this.setState({
            displayMediaUrl: '',
            displayMediaPoster: ''
        })
    }

    render() {
        const { mediaLists, displayMediaUrl, displayMediaPoster } = this.state;

        return (
            <section className={`mainView ${displayMediaUrl ? 'modalActive' : ''}`}>
                {displayMediaUrl ? <PlayerModal src={displayMediaUrl} poster={displayMediaPoster || ''} close={this.hideModal} /> : ""}
                {mediaLists.map((entities, index) => (
                    <MediaList 
                        key={index}
                        listTitle={entities.title}
                        entities={entities.data}
                        displayMedia={this.displayMedia}
                    />
                ))}
            </section>
        )
    }
}

export default MainView;