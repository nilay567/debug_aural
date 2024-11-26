import React from 'react'
import ProfileSearch from '../components/Profile/ProfileSearch'
import Achievements from '../components/Profile/Achievements'
import Follows from '../components/Profile/Follows'
import Analytics from '../components/Profile/Analytics'
import PredictiveSuggestions from '../components/Profile/PredictiveSuggestions'
import DiscussionGroup from '../components/Profile/DiscussionGroup'
export default function Profile() {
  return (
    <>
        <ProfileSearch />
        <Achievements />
        <Analytics />
        <PredictiveSuggestions />
        <DiscussionGroup />
    </>
  )
}
