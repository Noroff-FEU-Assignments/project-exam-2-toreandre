import React from 'react';
import Header from '../components/common/Header';
import './../styles/AboutPage.css';

const AboutPage = () => {
	return (
		<div> 
			<Header />
			<div className="about-page">
				<div className="about-page-content">
					<h1>Om movai</h1>
					<p>Movai er en plattform for smart og bærekraftig mobilitet. Vi tilbyr sanntidsinformasjon om kollektivtransport, bildeling og sykkelutleie. Vårt mål er å gjøre det enklere for deg å velge miljøvennlige transportalternativer.</p>
					<p>Plattformen er utviklet for å være enkel og intuitiv å bruke. Vi har også trent flere AI modeller til å bistå ved reisesøk og andre reise- og mobilitetsrelaterte tjenester som vi vil lansere litt etter litt.</p>
					<p>Movai er utviklet og drives av <a href="https://rosander.no">rosander.no</a></p>

					<h2>Reiseplanlegger</h2>
					<p>Reiseplanleggeren gir deg enkel tilgang til sanntidsinformasjon og oppdatert rutedata. Våre AI modeller gjøre at du kan søke i fritekst, så håndterer AI-ene resten.</p>
					<p>I den første versjonen har vi kun aktivert destinasjon holdeplass/område, ankomst holdeplass/område, tid og dato. I kommende versjon vil du også kunne filtrere søkeresultatene sammen med AI modellen vår.</p>

					<h2>Kontakt</h2>
					<p>Vi setter pris på tilbakemeldinger og spørsmål. Ta gjerne kontakt med oss på <a href="mailto:utvikler@movai.no">utvikler@movai.no</a></p>

					<h2>Personvern</h2>
					<p>Movai tar personvern på alvor. Vi lagrer ingen personlig informasjon om deg og vi deler heller ikke data om deg med tredjeparter.</p>
					<p>Ved bruk av kartet lagres en liste over tilgjengelige operatører i din nettleser slik at tjenesten husker dine filter valg.</p>

					<h2>Datakilder</h2>
					<p>Movai benytter seg av flere offentlige og private datakilder for å kunne tilby sanntidsinformasjon om kollektivtransport, bildeling og sykkelutleie. Vi er takknemlige for samarbeidet med våre partnere og dataleverandører.</p>
					<p>Entur, Yr, Hyre, MapBox</p>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
