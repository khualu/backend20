If you like the method in the link you've posted, have a look at Git Flow.

It's a set of scripts he created for that workflow.

But to answer your question:
`$ git checkout -b myFeature dev`

Creates MyFeature branch off dev. Do your work and then
`$ git commit -am "Your message"`

Now merge your changes to dev without a fast-forward

`$ git checkout dev`
`$ git merge --no-ff myFeature` 

Now push changes to the server

`$ git push origin dev`
`$ git push origin myFeature`
