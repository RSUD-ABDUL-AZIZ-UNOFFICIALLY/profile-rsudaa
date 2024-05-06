'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityResponse } from "../Model/activity.model";
import { ArticleResponse } from "../Model/article.model";

interface BaseContextType {
    modalActivity: boolean
    modalActivityItem: ActivityResponse
    modalArticle: boolean
    modalArticleItem: ArticleResponse
    setModalActivity: React.Dispatch<React.SetStateAction<boolean>>
    setModalActivityItem: React.Dispatch<React.SetStateAction<ActivityResponse>>
    setModalArticle: React.Dispatch<React.SetStateAction<boolean>>
    setModalArticleItem: React.Dispatch<React.SetStateAction<ArticleResponse>>
}

export const BaseContext = createContext<BaseContextType>({
    modalActivity: false,
    modalActivityItem: {},
    modalArticle: false,
    modalArticleItem: {},
    setModalActivity: () => { },
    setModalActivityItem: () => { },
    setModalArticle: () => { },
    setModalArticleItem: () => { }
})

export const BaseProvider = ({ children }: { children: any }) => {
    const [modalActivity, setModalActivity] = useState<boolean>(false)
    const [modalActivityItem, setModalActivityItem] = useState<ActivityResponse>({})

    const [modalArticle, setModalArticle] = useState<boolean>(false)
    const [modalArticleItem, setModalArticleItem] = useState<ArticleResponse>({})

    return (
        <BaseContext.Provider
            value={{
                modalActivity, setModalActivity,
                modalActivityItem, setModalActivityItem,
                modalArticle, setModalArticle,
                modalArticleItem, setModalArticleItem
            }} >
            {children}
        </BaseContext.Provider>
    )
}

