import React, {useEffect, useState} from 'react';
import styles from './Card.module.css';
import {useParams} from "react-router-dom";
import {getContributors, getCurrentRepo} from "../../reducers/actions/repos";


const Card = (props) => {
    const {username, reponame} = useParams()
    const [repo, setRepo] = useState({owner: {}})
    const [contributors, setContributors] = useState([])


    useEffect(() => {
        getCurrentRepo(username, reponame, setRepo)
        getContributors(username, reponame, setContributors)
    }, [])

    return (
        <div>
            <button onClick={() => props.history.goBack()} className={styles.backBtn}>Назад</button>
            <div className={styles.card}>
                <img src={repo.owner.avatar_url} alt=""/>
                <div className={styles.name}>{repo.name}</div>
                <div className={styles.stars}>{repo.stargazers_count}</div>
            </div>
            {contributors.map((c, index) =>
                <div>{index + 1}. {c.login}</div>
            )}
        </div>
    );
};

export default Card;