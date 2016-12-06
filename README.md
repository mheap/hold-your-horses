# Hold your horses!

Inspired by [this tweet](https://twitter.com/choult/status/772736328484126720).

Ever seen a PR come in on Github only to have it merged by an overeager coworker
before you've had chance to read through the changes?

`Hold your horses!` is a Github status check that will leave a pending status 
check open for a certain period of time. If combined with branch protection it
means that no-one can merge for however long you specify, leaving plenty of time
for code reviews.

[See an example video](https://vid.me/x3oo)

### Getting started

Clone this repo, edit `index.js` to specify your own Github auth token and then 
add a webhook to your repo that calls http://yourhostedcopyofthisrepo.com/hook.
At the moment there's no inspection of the payload, so any change to a pull
request will retrigger the status check
