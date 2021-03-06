moment = require 'moment'
moment.locale('ru')

authors = 'Altyncev Vladislav'
email = 'v@altyncev.ru'
github = 'npofopr'
twitter = 'npofopr'
gravata = 'vladislavaltyncev'

# =================================
# Helpers

# Titles
getName = (a,b) ->
    if b is null
        return textData[b] ? humanize(b)
    else
        return textData[a][b] ? humanize(b)
getProjectName = (project) ->
    getName('projectNames',project)
getCategoryName = (category) ->
    getName('categoryNames',category)
getLinkName = (link) ->
    getName('linkNames',link)
getLabelName = (label) ->
    getName('labelNames',label)

# Humanize
humanize = (text) ->
    text ?= ''
    return strUtil.humanize text.replace(/^[\-0-9]+/,'').replace(/\..+/,'')

# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON
docpadConfig = {

    # Regenerate each day
    regenerateEvery: 1000*60*60*24

    # =================================
    # Template Data
    # These are variables that will be accessible via our templates
    # To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ
    templateData:

        # Specify some site properties
        site:
            # The production url of our website
            url: "http://oleg.altyncev.ru"
            # Here are some old site urls that you would like to redirect from
            oldUrls: [
                'olegsite.herokuapp.com'
            ]
            # The default title of our website
            title: "Жизнь маленького человека"
            # The website description (for SEO)
            description: """
                Происходящие рядом события, глазами окружающих
                """
            # The website keywords (for SEO) separated by commas
            keywords: """
                жизнь, ребенок, олег
                """
            # The website author's name
            author: authors

            # Styles
            styles: [
                "/css/bootstrap.min.css"
                "/css/jquery.fancybox.css"
                "/css/social-likes.css"
                "/css/code.css"
                "/css/hint.min.css"
                "/css/style.css"
            ]

            # Scripts for index
            scripts: [
                "/js/jquery-1.7.2.min.js"
                "/js/jquery.fancybox.pack.js"
                "/js/social-likes.min.js"
                "/js/scripts.js"
            ]



        # -----------------------------
        # Helper Functions

        # Names
        getName: getName
        getProjectName: getProjectName
        getCategoryName: getCategoryName
        getLinkName: getLinkName
        getLabelName: getLabelName

        # Get the prepared site/document title
        # Often we would like to specify particular formatting to our page's title
        # we can apply that formatting here
        getPreparedTitle: ->
            # if we have a title, we should use it suffixed by the site's title
            if @document.pageTitle isnt false and @document.title
                "#{@document.pageTitle or @document.title} | #{@site.title}"
            # if we don't have a title, then we should just use the site's title
            else if @document.pageTitle is false or @document.title? is false
                @site.title
        # Get the prepared site/document description
        getPreparedDescription: ->
            # if we have a document description, then we should use that, otherwise use the site's description
            @document.description or @site.description

        # Get the prepared site/document keywords
        getPreparedKeywords: ->
            # Merge the document keywords with the site keywords
            @site.keywords.concat(@document.keywords or []).join(', ')

        getCuttedContent: (content) ->
            i = content.search('<!-- Read more -->')
            if i >= 0
                content[0..i-1]
            else
                content

        hasReadMore: (content) ->
            content.search('<!-- Read more -->') >= 0

        formatDate: (date,format='LL') ->
            return moment(date).format(format)

        formatDateArt: (date,format='L') ->
            return moment(date).format(format)



    # =================================
    # Collections
    # These are special collections that our website makes available to us
    collections:
        # For instance, this one will fetch in all documents that have pageOrder set within their meta data
        #pages: (database) ->
        #    database.findAllLive({pageOrder: $exists: true}, [pageOrder:1,title:1])

        #posts: ->
        #    @getCollection("documents").findAllLive({relativeOutDirPath:'posts'}, [date:-1])

        #posts: (database) ->
        #    database.findAllLive({relativeOutDirPath:'posts'},[date:-1])

        #posts: (database) ->
        #    database.findAll({relativeOutDirPath:/posts[\/\\]\w+/},[date:-1])

        posts: (database) ->
            database.findAll({relativeOutDirPath:/posts/},[date:-1])



    # =================================
    # Plugin Configuration

    # Configure Plugins
    # Should contain the plugin short names on the left, and the configuration to pass the plugin on the right
    plugins:

        stylus:
            stylusLibraries:
                nib: false
            stylusOptions:
                compress: true
                'include css': true

        sitemap:
            cachetime: 600000
            changefreq: 'weekly'
            priority: 0.5

        cleanurls:
            static: true

        paged:
            split: false
            prefix: ''
            index: 1
            compatibility: true

        tags:
            injectDocumentHelper: (document) ->
                document
                    .setMeta(
                        layout: 'tag'
                    )

    #
    environments:
        development:
            stylusOptions:
                compress: false

        highlightjs:
            aliases:
                missinglanguage: 'alternativelanguage'
            replaceTab: '    '


    # =================================
    # DocPad Events

    # Here we can define handlers for events that DocPad fires
    # You can find a full listing of events on the DocPad Wiki
    events:

        # Server Extend
        # Used to add our own custom routes to the server before the docpad routes are added
        serverExtend: (opts) ->
            # Extract the server from the options
            {server} = opts
            docpad = @docpad

            # As we are now running in an event,
            # ensure we are using the latest copy of the docpad configuraiton
            # and fetch our urls from it
            latestConfig = docpad.getConfig()
            oldUrls = latestConfig.templateData.site.oldUrls or []
            newUrl = latestConfig.templateData.site.url

            # Redirect any requests accessing one of our sites oldUrls to the new site url
            server.use (req,res,next) ->
                if req.headers.host in oldUrls
                    res.redirect(newUrl+req.url, 301)
                else
                    next()


        # =================================
        # Environment Configuration
        env: 'production'

}


# Export our DocPad Configuration
module.exports = docpadConfig