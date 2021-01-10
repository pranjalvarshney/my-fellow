import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"

import React, { useContext, useState } from "react"
import Moment from "react-moment"
import { useHistory } from "react-router-dom"
import { AdsContext } from "../../../../context/adsContext/AdsContext"
import { AuthContext } from "../../../../context/authContext/authContext"
// import { UserContext } from "../../../../context/userContext/UserContext"
import { API } from "../../../../utils/proxy"
import { AdsModal } from "../../Modals/AdsModal"

export const AdsCard = ({ ads }) => {
  const history = useHistory()
  const authContext = useContext(AuthContext)
  // const userContext = useContext(UserContext)
  const adsContext = useContext(AdsContext)
  const [moreOption, setMoreOption] = useState(null)
  const handleMoreOption = (e) => {
    setMoreOption(e.currentTarget)
  }
  const open = Boolean(moreOption)
  const handleClose = () => {
    setMoreOption(null)
  }
  const [showAds, setShowAds] = useState(false)

  const handleModalAds = () => {
    handleClose()
    setShowAds(!showAds)
  }
  return (
    <Card variant="elevation" elevation={3} className="mb-3">
      {showAds && (
        <AdsModal
          show={showAds}
          handleModal={handleModalAds}
          postFunction={adsContext.updatePost}
          modalTitle="Update post"
          post={ads}
        />
      )}
      <CardHeader
        avatar={
          <Avatar alt={ads.user.name} src={`${API}/pic/user/${ads.user._id}`} />
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMoreOption}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="fade-menu"
              anchorEl={moreOption}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              {authContext.user._id === ads.user._id ? (
                <MenuItem onClick={handleModalAds}>Edit</MenuItem>
              ) : null}
              {authContext.user._id === ads.user._id ? (
                <MenuItem
                  onClick={() => {
                    adsContext.deletePost(authContext.user._id, ads._id)
                    handleClose()
                  }}
                >
                  Delete
                </MenuItem>
              ) : null}
              <MenuItem onClick={handleClose}>Share</MenuItem>
              <MenuItem onClick={handleClose}>Bookmark</MenuItem>

              <MenuItem onClick={handleClose}>Report Post</MenuItem>
            </Menu>
          </>
        }
        title={
          <b
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/profile/${ads.user._id}`)
            }}
          >
            {ads.user.name}
          </b>
        }
        subheader={<Moment fromNow>{ads.createdAt}</Moment>}
      />

      {ads.picture.length > 0 && (
        <img width="100%" src={`/${ads.picture[0]}`} alt={ads.picture[0]} />
      )}
      <CardContent className="py-1">
        <Typography variant="body1" component="p">
          {ads.title}
        </Typography>
        <Typography variant="body2" component="p">
          {ads.content}
        </Typography>
        <Typography variant="subtitle1" component="p">
          {ads.contact}
        </Typography>
      </CardContent>
    </Card>
  )
}
