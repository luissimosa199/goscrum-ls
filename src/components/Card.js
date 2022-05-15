import { useState } from 'react';

const Card = ({
    deleteCard,
    editCardStatus,
    data: {
        _id,
        title,
        user: { userName },
        createdAt,
        status,
        importance,
        description },
    data,
}) => {

    const [showMore, setShowMore] = useState(false)

    const datetime = new Date(createdAt).toLocaleString()

    const limitString = str => {
        if (str.length > 170) {
            return { string: str.slice(0, 167).concat('...'), addButton: true }
        }

        return { string: str, addButton: false }
    }

    return (
        <li className="card mb-2">
            <div className="card_content p-2">
                <h4 className="card_name fs-12">{title}</h4>
                <p className="card_date small text-muted fs-8">{datetime}</p>
                <p className="card_author small text-muted fs-8">{userName}</p>
                <div className="info_btns my-2">
                    <button
                        onClick={() => { editCardStatus(data) }}
                        type="button"
                        className={status === 'NEW' ? 'btn btn-sm btn-danger' : status === 'IN PROGRESS' ? 'btn btn-sm btn-warning' : 'btn btn-sm btn-success'}
                    >
                        {status.toLowerCase()}</button>
                    <button
                        type="button"
                        className={importance === 'HIGH' ? 'btn btn-sm btn-danger' : importance === 'MEDIUM' ? 'btn btn-sm btn-warning' : 'btn btn-sm btn-info'}
                    >
                        {importance.toLowerCase()}
                    </button>
                </div>
                {!showMore && <p className="fs-8">{limitString(description).string}</p>}
                {showMore && <><p className="fs-8">{description}</p><button className="btn btn-danger btn-sm btn_showmore" onClick={() => { setShowMore(false) }}>Ver menos</button></>}
                {!showMore && limitString(description).addButton && (
                    <button className="btn btn-primary btn-sm btn_showmore" type="button" onClick={() => { setShowMore(true) }}>Ver más</button>
                )}
            </div>
            <div className="card_close m-2" onClick={() => { deleteCard(_id) }}>X</div>
        </li>
    );
}

export default Card;