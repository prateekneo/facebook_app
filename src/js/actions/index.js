import { SAVE_TOKEN } from '../constant/action-types'
import { SAVE_USER_DETAILS } from '../constant/action-types'
import { TOGGLE_SIDEBAR } from '../constant/action-types' 

export function saveToken(payload) {
    return {
        type : SAVE_TOKEN, payload
    }
} 

export function saveUserDetails(payload) {
    return {
        type : SAVE_USER_DETAILS, payload
    }
}

export function toggleSidebar() {
    return {
        type : TOGGLE_SIDEBAR
    }
}