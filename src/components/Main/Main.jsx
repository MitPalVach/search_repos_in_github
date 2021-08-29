import React, {useEffect, useState} from 'react';
import styles from './Main.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getRepos} from "../../reducers/actions/repos";
import Repo from "../Repo/Repo";
import {setCurrentPage} from "../../reducers/reposReducer";
import {createPages} from "../../utils/pageCreator";
import {Redirect} from "react-router-dom";


const Main = () => {
    const dispatch = useDispatch()
    const repos = useSelector(state => state.repos.items)
    const isFetching = useSelector(state => state.repos.isFetching)
    const currentPage = useSelector(state => state.repos.currentPage)
    const totalCount = useSelector(state => state.repos.totalCount)
    const perPage = useSelector(state => state.repos.perPage)
    const isFetchError = useSelector(state => state.repos.isFetchError)
    const [searchValue, setSearchValue] = useState('')
    const pagesCount = Math.ceil(totalCount / perPage)
    const pages = []
    createPages(pages, pagesCount, currentPage)

    useEffect(() => {
        dispatch(getRepos(searchValue, currentPage, perPage))
    }, [currentPage])

    function searchHandler() {
        dispatch(currentPage(1))
        dispatch(getRepos(searchValue))
    }

    const onKeyPressHandler = (e) => {
        if (e.key === 'Enter') {
            searchHandler()
        }
    }

    if (isFetchError) {
        return <Redirect to='/error'/>
    }

    return (
        <>
            <div className={styles.search}>
                <input value={searchValue}
                       onChange={(e) => setSearchValue(e.target.value)}
                       type="text"
                       placeholder='Введите название репозитория'
                       onKeyPress={onKeyPressHandler}
                       className={styles.searchInput}/>
                <button onClick={() => searchHandler()}
                        className={styles.searchBtn}
                >Поиск
                </button>
            </div>
            {
                isFetching === false
                    ? repos.map(repo => <Repo repo={repo}/>)
                    : <div className={styles.fetching}>

                    </div>
            }
            <div className={styles.pages}>
                {pages.map((page, index) =>
                    <span key={index}
                          className={currentPage === page
                              ? styles.currentPage : styles.page}
                          onClick={() => dispatch(setCurrentPage(page))}
                    >{page}</span>)}
            </div>
        </>
    );
};

export default Main;