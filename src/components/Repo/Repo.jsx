import React from 'react';
import styles from './Repo.module.css';
import {NavLink} from "react-router-dom";


const Repo = (props) => {
    const repo = props.repo

    return (
        <div className={styles.repo}>
            <div className={styles.repoHeader}>
                <div className={styles.repoHeaderName}>
                    <NavLink
                        to={`/card/${repo.owner.login}/${repo.name}`}>
                        {repo.name}
                    </NavLink>
                </div>
                <div className={styles.repoHeaderStars}>
                    {repo.stargazers_count}
                </div>
            </div>
            <div className={styles.repoLastCommit}>
                Последний коммит: {repo.updated_at}
            </div>
            <a href={repo.html_url}
               className={styles.repoLink}
               target='_blank'>
                <span>Ссылка на репозиторий: </span>{repo.html_url}
            </a>
        </div>
    );
};

export default Repo;