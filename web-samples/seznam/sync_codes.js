(function(){
    function createIframe(src) {
        var iframe = document.createElement("iframe");
        iframe.width=1;
        iframe.height=1;
        iframe.frameBorder=0
        iframe.setAttribute("style", "position:absolute; top:-1px;left:-1px;visibility:hidden;");
        iframe.src = src;
        document.body.insertBefore(iframe,document.body.firstChild);
    }
    /*synchronizace adformu */
    createIframe("//h.imedia.cz/html/adform_sync.html");

    /* GDPR souhlas CMP */
    /*createIframe("https://i.imedia.cz/html/cmp.html");*/

    im._pubmaticSync();

    im._appnexusSync();
})()
