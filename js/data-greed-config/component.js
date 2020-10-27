/*jshint esversion: 6 */
function initDataGreedConfigComponent(vapp)
{

    //  COMPONENT
    //
    vapp.component(
        'data-greed-config',
        {
            data: function()
            {
                return {
                    "tabs": [true, false],
                    "sw": false
                };
            },
            props: ['config'],
            template: '' + templateDataGreedConfig.replace(/<!--.*?-->/gm, '') + '',
            mounted: function() {},
            computed:
            {},
            watch:
            {},
            methods:
            {
                testDictionnary: function(t)
                {
                    switch (t.type)
                    {
                        case "input":
                            delete t["dictionnary"];
                            delete t["css"];
                            t.minLength = 3;
                            break;
                        case "select":
                            t.dictionnary = [];
                            t.css = "";
                            delete t["minLength"];
                            break;
                    }
                },
                udpateFctTransform: function(e, elm)
                {
                    var newFunction = e.target.previousElementSibling.previousElementSibling.value;
                    elm.fctTransform = new Function('s', 't', newFunction);
                }
            }
        }
    );
}