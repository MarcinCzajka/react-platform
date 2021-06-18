import React from 'react';
import './MediaList.scss';
import MediaListItem from './MediaListItem/MediaListItem';
import Arrow from './Navigation/Arrow';

type MediaListProps = {
    listTitle: string,
    entities: [],
    displayMedia: (Id: number, poster?: string) => void
}

type MediaListState = {
    offset: number,
    offsetIncrement: number,
    maxOffset: number
}

class MediaList extends React.Component<MediaListProps, MediaListState> {

    constructor(props: MediaListProps) {
        super(props);

        this.state = {
            offset: 0,
            offsetIncrement: window.innerWidth / 5,
            maxOffset: (props.entities.length - 5) * -(window.innerWidth / 5)
        }

        this.nextItems = this.nextItems.bind(this);
        this.previousItems = this.previousItems.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ 
            offset: 0,
            offsetIncrement: window.innerWidth / 5,
            maxOffset: (this.props.entities.length - 5) * -(window.innerWidth / 5)
        });
    }


    nextItems() {
        const { offset, offsetIncrement } = this.state;
        this.setState({
            offset: offset - offsetIncrement
        })
    }

    previousItems() {
        const { offset, offsetIncrement } = this.state;
        this.setState({
            offset: offset + offsetIncrement
        })
    }


    render() {
        const { listTitle, entities, displayMedia } = this.props;
        const { offset, offsetIncrement, maxOffset } = this.state;

        return (
            <div className="mediaListContainer">
                <h1 className="listTitle">{listTitle}</h1>
                <Arrow direction="left" isVisible={offset >= 0 ? false : true} handleClick={this.previousItems} />

                <div className="mediaList" style={{left: `${this.state.offset}px`}} >
                    {entities.map((entity, index) => <MediaListItem entity={entity} key={index} displayMedia={displayMedia} />)}
                </div>

                <Arrow direction="right" isVisible={offset - offsetIncrement > maxOffset ? true : false} handleClick={this.nextItems} />
            </div>
        )
    }
}

export default MediaList