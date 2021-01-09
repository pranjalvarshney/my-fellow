import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Grid } from "@material-ui/core"
import React, { useContext, useEffect } from "react"
import { AdsContext } from "../../../../context/adsContext/AdsContext"
import { UserContext } from "../../../../context/userContext/UserContext"
import { Home } from "../../../common/Base/Home"
import { AdsCard } from "./AdsCard"
import { LoadingAds } from "./LoadingAds"

export const Ads = () => {
  const adsContext = useContext(AdsContext)
  const userContext = useContext(UserContext)
  useEffect(() => {
    adsContext.getAllAds()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Home>
      <div className="px-2">
        {adsContext.loading || userContext.loading ? (
          <LoadingAds />
        ) : adsContext.ads.length > 0 ? (
          adsContext.ads.map((ads) => {
            console.log(adsContext)
            return (
              <div key={ads._id}>
                <AdsCard ads={ads} />
              </div>
            )
          })
        ) : (
          <div
            className="m-auto"
            style={{
              height: "30vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              spacing={3}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <FontAwesomeIcon icon={faPencilAlt} fontSize="large" />
              <h6 className="mt-2">No ads out there</h6>
            </Grid>
          </div>
        )}
      </div>
    </Home>
  )
}
