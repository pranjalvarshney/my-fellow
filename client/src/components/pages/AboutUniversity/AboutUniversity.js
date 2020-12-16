import React from "react";
import Header from "../../common/Header/Header";
import {
	Card,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Typography,
} from "@material-ui/core";
import "./AboutUniversity.css";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

export const AboutUniversity = () => {
	return (
		<div className="home">
			<Header />
			<div className="container" id="aboutContainer">
				<Grid container justify="center">
					<Grid item xs={10}>
						<Card variant="outlined">
							<Grid
								container
								justify="center"
								alignItems="flex-start"
								className="p-3 ">
								<Grid item xs={8} md={4}>
									<Grid
										container
										justify="center"
										alignContent="center">
										<CardMedia
											component="img"
											style={{ maxWidth: "150px" }}
											image="gbu_logo.png"
											label={"Logo"}
										/>
									</Grid>
								</Grid>
								<Grid item xs={12} md={12}>
									<Grid container justify="center">
										<CardContent className="text-center">
											<Typography
												gutterBottom
												variant="h3"
												component="h2">
												{"Gautam Buddha University"}
											</Typography>
											<Typography
												gutterBottom
												variant="subtitle1">
												<a
													href="http://www.gbu.ac.in/"
													target="_blank"
													rel="noreferrer noopener">
													{
														"Official University Website"
													}
													<OpenInNewIcon fontSize="small" />
												</a>
											</Typography>
										</CardContent>
									</Grid>
								</Grid>
							</Grid>
						</Card>
					</Grid>
				</Grid>
				<Grid container justify="center" className="my-3">
					<Grid item xs={10}>
						<Card variant="outlined">
							<Container className="px-5 py-4">
								<Typography
									variant="h4"
									className="text-center pb-3">
									About University
								</Typography>
								<Typography variant="body2">
									{
										"Gautam Buddha University, established by the Uttar Pradesh Act (9) of 2002, commenced its first academic session at its 511 acres lush green campus at Greater Noida in August 2008. The University is fully funded by the New Okhla Industrial Development Authority (NOIDA) and the Greater Noida Industrial Development Authority (GNIDA), the undertakings of the Government of Uttar Pradesh. The University is recognized by the University Grants Commission under UGC Act and is a member of the Association of Indian Universities."
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										"The academic programmes offered by the University are recognised by the University Grants Commission of India and various other Statutory Bodies, Councils, whichever are applicable in individual cases."
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										"Recognition by the University Grants Commission of India (UGC): Gautam Buddha University is recognized by the University Grants Commission of India vide F.9-18/2009 (CRP-I) dated 13 May 2009 under section 2(f) of UGC Act 1956. Through this the University has been empowered to award degrees as specified by UGC under section 22 of the UGC Act 1956 at its main campus with the approval of Statutory Councils, wherever required."
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										"Recognition and Inclusion by the University Grants Commission of India (UGC) under section 12 B of the University Grants Commission, UGC ACT 1956. Recognised under UGC Section 12B and NAAC accredited with B+ Grade."
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										"Association of Indian Universities Membership: The University has been granted membership of the Association of Indian Universities."
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										"Approval by the Bar Council of India: The School of Law, Justice, & Governance administers a five years Integrated B.A. LLB programme. This Programme has been approved by the Bar Council of India."
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										"Approval by National Council for Teacher Education (NCTE): The Department of Education & Training, School of Humanities & Social Sciences offer Two-Year B.Ed. Programme recognized by the National Council for Teacher Education (NCTE)."
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										"Approval by Rehabilitation Council of India: The Department of Psychology & Mental Health, School of Humanities & Social Sciences offers M. Phil. (Clinical Psychology), 2 years Programme which is recognized by the Rehabilitation Council of India."
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										"Approval by the Council of Architecture, India: The Department of Architect & Planning, School of Engineering offers B.Arch. and M. Arch. Programmes in Architect and Planning. This programme is recognized by the Council of Architecture, India."
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										"ISO 9001: 2008 Certification of the University: Gautam Buddha University has been accredited jointly be Joint Accreditation System of Australia & New Zealand (JAS-ANZ), vide 1015QBC26 after accessing and finding confirmation to the requirements of ISO 9001: 2008."
									}
								</Typography>
							</Container>
						</Card>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};
