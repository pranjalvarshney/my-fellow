import {
	Card,
	CardContent,
	CardMedia,
	Container,
	Divider,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	Paper,
	Switch,
	Typography,
} from "@material-ui/core";
import React from "react";
import "./SettingsPrivacy.css";
import Header from "../../common/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const SettingsPrivacy = () => {
	return (
		<div className="home">
			<Header />
			<div className="container w-100" id="aboutContainer">
				<Grid container justify="center">
					<Grid item xs={10}>
						<Card variant="outlined">
							<Grid
								container
								justify="flex-start"
								// alignItems="flex-start"
								className="p-3 ">
								<CardContent className="w-100">
									<section className="general-settings">
										<Typography
											gutterBottom
											variant="h5"
											component="h2"
											className="pb-4">
											{"General Account Settings"}
										</Typography>
										<ul className="settings-ul">
											<li className="py-2">
												<Grid container spacing={3}>
													<Grid item xs={3}>
														<Typography variant="button">
															Name
														</Typography>
													</Grid>
													<Grid item xs={9}>
														<Typography variant="subtitle2">
															Devesh Kumar Singh
														</Typography>
													</Grid>
												</Grid>
											</li>
											<Divider />
											<li className="py-2">
												<Grid container spacing={3}>
													<Grid item xs={3}>
														<Typography variant="button">
															Roll No.
														</Typography>
													</Grid>
													<Grid item xs={9}>
														<Typography variant="subtitle2">
															17/ICS/274
														</Typography>
													</Grid>
												</Grid>
											</li>
											<Divider />
											<li className="py-2">
												<Grid container spacing={3}>
													<Grid item xs={3}>
														<Typography variant="button">
															Email
														</Typography>
													</Grid>
													<Grid item xs={9}>
														<Typography variant="subtitle2">
															devesh28@mail.mail
														</Typography>
													</Grid>
												</Grid>
											</li>
											<Divider />
											<li className="py-2">
												<Grid container spacing={3}>
													<Grid item xs={3}>
														<Typography variant="button">
															Password
														</Typography>
													</Grid>
													<Grid item xs={7}>
														<Typography variant="subtitle2">
															********
														</Typography>
													</Grid>
													<Grid item xs={2}>
														<a href="#">
															<Typography className="text-right">
																<FontAwesomeIcon
																	icon={
																		faEdit
																	}
																/>
																{" Reset"}
															</Typography>
														</a>
													</Grid>
												</Grid>
											</li>
										</ul>
									</section>
									<section className="Theme mt-5">
										<Typography
											gutterBottom
											variant="h5"
											component="h2"
											className="pb-4">
											{"Theme"}
										</Typography>
										<FormControl component="fieldset">
											<FormGroup
												aria-label="position"
												row>
												<Typography className="my-auto">
													{"Dark Theme"}
												</Typography>
												<FormControlLabel
													className="ml-0 my-auto"
													value="dark"
													control={
														<Switch color="primary" />
													}
												/>
											</FormGroup>
										</FormControl>
									</section>
								</CardContent>
							</Grid>
						</Card>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};
