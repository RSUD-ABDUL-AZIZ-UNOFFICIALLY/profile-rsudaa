'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { activityResponse } from "../Model/activity.model";
import { articleResponse } from "../Model/article.model";

interface BaseContextType {
    modalActivity: boolean
    modalActivityItem: activityResponse
    modalArticle: boolean
    alertSuccessApplyLoker: boolean
    modalArticleItem: articleResponse
    setAlertSuccessApplyLoker: React.Dispatch<React.SetStateAction<boolean>>
    setModalActivity: React.Dispatch<React.SetStateAction<boolean>>
    setModalActivityItem: React.Dispatch<React.SetStateAction<activityResponse>>
    setModalArticle: React.Dispatch<React.SetStateAction<boolean>>
    setModalArticleItem: React.Dispatch<React.SetStateAction<articleResponse>>
}

export const BaseContext = createContext<BaseContextType>({
    modalActivity: false,
    alertSuccessApplyLoker: false,
    modalActivityItem: {},
    modalArticle: false,
    modalArticleItem: {},
    setModalActivity: () => { },
    setModalActivityItem: () => { },
    setModalArticle: () => { },
    setModalArticleItem: () => { },
    setAlertSuccessApplyLoker: () => { }
})

export const BaseProvider = ({ children }: { children: any }) => {
    const [modalActivity, setModalActivity] = useState<boolean>(false)
    const [modalActivityItem, setModalActivityItem] = useState<activityResponse>({})

    const [modalArticle, setModalArticle] = useState<boolean>(false)
    const [modalArticleItem, setModalArticleItem] = useState<articleResponse>({})

    const [alertSuccessApplyLoker, setAlertSuccessApplyLoker] = useState<boolean>(false)

    return (
        <BaseContext.Provider
            value={{
                modalActivity, setModalActivity,
                modalActivityItem, setModalActivityItem,
                modalArticle, setModalArticle,
                modalArticleItem, setModalArticleItem,
                alertSuccessApplyLoker, setAlertSuccessApplyLoker
            }} >
            {children}
        </BaseContext.Provider>
    )
}

