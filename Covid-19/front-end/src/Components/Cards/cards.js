import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import style from './cards.module.css';
import cx from 'classnames';

const Cards = (props) => {

    const {
        totalConfirmed,
        totalRecovered,
        totalDeaths,
        totaldate
    } = props;


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1 >Maailma</h1>
            </div>
            <Grid container spacing={5} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(style.card, style.tartunnat)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Tapaukset yhteensä</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={totalConfirmed} duration={2.5} separator="," />
                        </Typography>
                        <Typography color="textSecondary">{new Date(totaldate).toDateString()}</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(style.card, style.parantuneet)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Parantuneet</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={totalRecovered} duration={2.5} separator="," />
                        </Typography>
                        <Typography color="textSecondary">{new Date(totaldate).toDateString()}</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(style.card, style.kuolemat)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Kuolemat</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={totalDeaths} duration={2.5} separator="," />
                        </Typography>
                        <Typography color="textSecondary">{new Date(totaldate).toDateString()}</Typography>
                    </CardContent>
                </Grid>

            </Grid>
        </div>
    );
}

export default Cards;