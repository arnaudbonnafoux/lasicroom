--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-0+deb12u1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-0+deb12u1)

-- Started on 2025-07-04 09:39:13 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 17063)
-- Name: accompagnement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accompagnement (
    id_demande integer NOT NULL,
    nom_artiste character varying(100) NOT NULL,
    email_artiste character varying(100) NOT NULL,
    style_musical character varying(100),
    message text,
    date_envoi timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    traite boolean DEFAULT false
);


ALTER TABLE public.accompagnement OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17062)
-- Name: accompagnement_id_demande_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accompagnement_id_demande_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accompagnement_id_demande_seq OWNER TO postgres;

--
-- TOC entry 3401 (class 0 OID 0)
-- Dependencies: 220
-- Name: accompagnement_id_demande_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accompagnement_id_demande_seq OWNED BY public.accompagnement.id_demande;


--
-- TOC entry 223 (class 1259 OID 17095)
-- Name: artiste; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.artiste (
    id_artiste integer NOT NULL,
    nom_artiste character varying(100) NOT NULL,
    style_musical character varying(100),
    description text,
    photo character varying(255),
    lien_video character varying(255)
);


ALTER TABLE public.artiste OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17094)
-- Name: artiste_id_artiste_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.artiste_id_artiste_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.artiste_id_artiste_seq OWNER TO postgres;

--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 222
-- Name: artiste_id_artiste_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.artiste_id_artiste_seq OWNED BY public.artiste.id_artiste;


--
-- TOC entry 217 (class 1259 OID 17035)
-- Name: concert; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.concert (
    id_concert integer NOT NULL,
    titre character varying(100) NOT NULL,
    description text,
    date_concert timestamp without time zone NOT NULL,
    nb_places_total integer NOT NULL,
    nb_places_restantes integer NOT NULL,
    tarif_plein numeric(6,2) NOT NULL,
    tarif_abonne numeric(6,2) NOT NULL,
    id_artiste integer
);


ALTER TABLE public.concert OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 17034)
-- Name: concert_id_concert_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.concert_id_concert_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.concert_id_concert_seq OWNER TO postgres;

--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 216
-- Name: concert_id_concert_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.concert_id_concert_seq OWNED BY public.concert.id_concert;


--
-- TOC entry 219 (class 1259 OID 17044)
-- Name: reservation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservation (
    id_reservation integer NOT NULL,
    date_reservation timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_utilisateur integer,
    id_concert integer,
    type_tarif character varying(20) NOT NULL,
    montant numeric(6,2) NOT NULL,
    CONSTRAINT reservation_type_tarif_check CHECK (((type_tarif)::text = ANY ((ARRAY['plein'::character varying, 'abonne'::character varying])::text[])))
);


ALTER TABLE public.reservation OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 17043)
-- Name: reservation_id_reservation_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservation_id_reservation_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservation_id_reservation_seq OWNER TO postgres;

--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 218
-- Name: reservation_id_reservation_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservation_id_reservation_seq OWNED BY public.reservation.id_reservation;


--
-- TOC entry 215 (class 1259 OID 17023)
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur (
    id_utilisateur integer NOT NULL,
    nom character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    mot_de_passe character varying(255) NOT NULL,
    role character varying(50) NOT NULL,
    CONSTRAINT utilisateur_role_check CHECK (((role)::text = ANY ((ARRAY['utilisateur'::character varying, 'admin'::character varying])::text[])))
);


ALTER TABLE public.utilisateur OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 17022)
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.utilisateur_id_utilisateur_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.utilisateur_id_utilisateur_seq OWNER TO postgres;

--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 214
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.utilisateur_id_utilisateur_seq OWNED BY public.utilisateur.id_utilisateur;


--
-- TOC entry 3223 (class 2604 OID 17066)
-- Name: accompagnement id_demande; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accompagnement ALTER COLUMN id_demande SET DEFAULT nextval('public.accompagnement_id_demande_seq'::regclass);


--
-- TOC entry 3226 (class 2604 OID 17098)
-- Name: artiste id_artiste; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artiste ALTER COLUMN id_artiste SET DEFAULT nextval('public.artiste_id_artiste_seq'::regclass);


--
-- TOC entry 3220 (class 2604 OID 17038)
-- Name: concert id_concert; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.concert ALTER COLUMN id_concert SET DEFAULT nextval('public.concert_id_concert_seq'::regclass);


--
-- TOC entry 3221 (class 2604 OID 17047)
-- Name: reservation id_reservation; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation ALTER COLUMN id_reservation SET DEFAULT nextval('public.reservation_id_reservation_seq'::regclass);


--
-- TOC entry 3219 (class 2604 OID 17026)
-- Name: utilisateur id_utilisateur; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur ALTER COLUMN id_utilisateur SET DEFAULT nextval('public.utilisateur_id_utilisateur_seq'::regclass);


--
-- TOC entry 3393 (class 0 OID 17063)
-- Dependencies: 221
-- Data for Name: accompagnement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accompagnement (id_demande, nom_artiste, email_artiste, style_musical, message, date_envoi, traite) FROM stdin;
1	Groupe Test	groupe@test.com	Rock expérimental	Bonjour, nous aimerions être accompagnés pour un prochain concert.	2025-06-21 14:39:07.804347	f
2	Groupe Test	groupe@test.com	Rock expérimental	Bonjour, nous aimerions être accompagnés pour un prochain concert.	2025-06-21 15:01:42.947068	f
3	Groupe Test	groupe@test.com	Rock	Nous souhaitons être accompagnés.	2025-06-24 15:33:03.87709	f
4	Groupe Test	groupe@test.com	Rock	Nous souhaitons être accompagnés.	2025-06-24 15:40:59.537546	f
5	Groupe Test	groupe@test.com	Rock	Nous souhaitons être accompagnés.	2025-06-24 15:41:41.69871	f
6	Azur	azur@gmail.com	rock	rien	2025-06-29 10:17:00.058144	f
\.


--
-- TOC entry 3395 (class 0 OID 17095)
-- Dependencies: 223
-- Data for Name: artiste; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.artiste (id_artiste, nom_artiste, style_musical, description, photo, lien_video) FROM stdin;
\.


--
-- TOC entry 3389 (class 0 OID 17035)
-- Dependencies: 217
-- Data for Name: concert; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.concert (id_concert, titre, description, date_concert, nb_places_total, nb_places_restantes, tarif_plein, tarif_abonne, id_artiste) FROM stdin;
2	Concert Modifié	Description mise à jour	2025-07-11 20:30:00	150	100	30.00	20.00	\N
9	Concert Jazz	Concert de test pour réservation	2025-08-15 21:00:00	100	100	30.00	20.00	\N
4	Test PUT Concert	Concert test PUT	2025-07-15 20:30:00	150	149	20.00	15.00	\N
10	Concert Test	Un concert test	2025-07-10 20:00:00	100	100	25.00	15.00	\N
\.


--
-- TOC entry 3391 (class 0 OID 17044)
-- Dependencies: 219
-- Data for Name: reservation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservation (id_reservation, date_reservation, id_utilisateur, id_concert, type_tarif, montant) FROM stdin;
2	2025-08-01 00:00:00	4	4	plein	30.00
\.


--
-- TOC entry 3387 (class 0 OID 17023)
-- Dependencies: 215
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilisateur (id_utilisateur, nom, email, mot_de_passe, role) FROM stdin;
4	Alice Dupont	alice@example.com	password123	utilisateur
8	loulou	loulou@gmail.com	123123	utilisateur
9	Arnaud Bonnafoux	bonnafoux@gmail.com	14031976	utilisateur
\.


--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 220
-- Name: accompagnement_id_demande_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accompagnement_id_demande_seq', 6, true);


--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 222
-- Name: artiste_id_artiste_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.artiste_id_artiste_seq', 1, false);


--
-- TOC entry 3408 (class 0 OID 0)
-- Dependencies: 216
-- Name: concert_id_concert_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.concert_id_concert_seq', 10, true);


--
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 218
-- Name: reservation_id_reservation_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservation_id_reservation_seq', 4, true);


--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 214
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utilisateur_id_utilisateur_seq', 9, true);


--
-- TOC entry 3238 (class 2606 OID 17072)
-- Name: accompagnement accompagnement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accompagnement
    ADD CONSTRAINT accompagnement_pkey PRIMARY KEY (id_demande);


--
-- TOC entry 3240 (class 2606 OID 17102)
-- Name: artiste artiste_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artiste
    ADD CONSTRAINT artiste_pkey PRIMARY KEY (id_artiste);


--
-- TOC entry 3234 (class 2606 OID 17042)
-- Name: concert concert_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.concert
    ADD CONSTRAINT concert_pkey PRIMARY KEY (id_concert);


--
-- TOC entry 3236 (class 2606 OID 17051)
-- Name: reservation reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (id_reservation);


--
-- TOC entry 3230 (class 2606 OID 17033)
-- Name: utilisateur utilisateur_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_email_key UNIQUE (email);


--
-- TOC entry 3232 (class 2606 OID 17031)
-- Name: utilisateur utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id_utilisateur);


--
-- TOC entry 3241 (class 2606 OID 17103)
-- Name: concert fk_artiste; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.concert
    ADD CONSTRAINT fk_artiste FOREIGN KEY (id_artiste) REFERENCES public.artiste(id_artiste) ON DELETE SET NULL;


--
-- TOC entry 3242 (class 2606 OID 17057)
-- Name: reservation reservation_id_concert_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_id_concert_fkey FOREIGN KEY (id_concert) REFERENCES public.concert(id_concert) ON DELETE CASCADE;


--
-- TOC entry 3243 (class 2606 OID 17052)
-- Name: reservation reservation_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateur(id_utilisateur) ON DELETE CASCADE;


-- Completed on 2025-07-04 09:39:17 CEST

--
-- PostgreSQL database dump complete
--

