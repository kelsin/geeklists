# Geeklists
A front end for geeklist-api

[![Travis](https://img.shields.io/travis/kelsin/geeklists.svg)](https://travis-ci.org/kelsin/geeklists)
[![Code Climate](https://img.shields.io/codeclimate/coverage/github/kelsin/geeklists.svg)](https://codeclimate.com/github/kelsin/geeklists)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/kelsin/geeklists.svg)](https://codeclimate.com/github/kelsin/geeklists)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)

## Purpose

This app provides a view into the stats that the
[https://github.com/kelsin/geeklist-api](geeklist-api) gathers.

It is available for use at [https://geeklists.kelsin.net/](https://geeklists.kelsin.net/).

## Redux Store

This app uses [https://redux.js.org/](redux) as a state management tool and here
is the format of the state stored in redux:

```js
let state = {
  // How many threads are trying to load stuff at the moment, for display purposes
  loading: 1,

  // Data from the API
  groups: {
    sgoyt: {
      slug: "sgoyt",
      name: "Solitaire Games On Your Table",
      thread: 986303, // Subscription thread for the group
      imageid: 2372684, // Image for the group - Not used yet

      // All users in this group
      users: {
        Kelsin: {
          username: "Kelsin",
          group_slug: "sgoyt",

          // Stats for this user as part of this group
          stats: {
            entries: 20,
            games: 17,
            uniques: 17,
            summaries: 20,
            ratings: 20
          },

          // Ratings for this user as part of this group
          ratings: [{
            objectname: "Castellion",
            objectid: 143404,
            imageid: 2682875,
            summary: "Excellent puzzle with amazing art and fast play time!",
            rating: 4.5,
            id: 5681310,
            postdate: "2017-10-03T17:58:18.000Z"
          },
          ...
          ],

          // Data for the geeklists that this user posted to
          geeklists: {
            "233358": {
              geeklist_id: 233358,
              title: "Solitaire Games on Your Table -- December 2017",
              year: 2017,
              month: 12,

              // Stats for this user, for this geeklist, as part of this group
              stats: {
                entries: 6,
                games: 4,
                uniques: 4,
                summaries: 6,
                ratings: 6
              },

              // Entries for this user, for this geeklist, as part of this group
              entries: [{
                objectname: "Gladiator Gauntlet",
                objectid: 226502,
                imageid: 3543520,
                thumbs: 31,
                summary: "Very fast thematic dice 9-card micro game",
                rating: 4.5,
                id: 5815209,
                postdate: "2017-12-06T07:22:29.000Z",
              },
              ...
              ]
            },
            ...
          }

        },
        ...
      },

      // All geeklists in this group
      geeklists: {
        "233358": {
          title: "Solitaire Games on Your Table -- December 2017",
          id: 233358,
          year: 2017,
          month: 12,
          group_slug: "sgoyt",
          updated_at: "2017-12-13T16:50:56.733Z",

          // Stats for this geeklist as part of this group
          stats: {
            entries: 426,
            games: 244,
            users: 139,
            uniques: 356,
            summaries: 37,
            ratings: 27
          },

          // Entries for this geeklist
          entries: [{
            username: "Kelsin",
            objectname: "Gladiator Gauntlet",
            objectid: 226502,
            imageid: 3543520,
            thumbs: 31,
            summary: "Very fast thematic dice 9-card micro game",
            rating: 4.5,
            id: 5815209,
            postdate: "2017-12-06T07:22:29.000Z",
          },
          ...
          ]
        },
        ...
      }
    },
    ...
  }
};
```

_Please note that some objects will have more fields than listed here, this is
just the important ones!_
