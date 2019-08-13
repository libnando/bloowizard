BlooWizard
======

#### A clean and cute wizard with vanilla js (and.. css of course! o/)

---

### Getting Started

1. Include 'bloowizard.js' and 'bloowizard.css' on your page.
2. Add html wizard elements (see below #wzdDefault)
3. Instantiate a Bloowizard object and have fun!

Example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">    
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <link rel="stylesheet" type="text/css" href="bloowizard.css">
    <title>BlooWizar</title>    
</head>

<body>

    <div style="padding:30px;">
        
        <div id="wzdDefault" class="bloowizard">
            
            <div class="bloo-head">
                <ul>
                    <li><a href="javascript:;" class="bloo-action-step step-current"> 1 - Lorem </a></li>
                    <li><a href="javascript:;" class="bloo-action-step"> 2 - Ipsum </a></li>
                    <li><a href="javascript:;" class="bloo-action-step"> 3 - Dolor </a></li>
                </ul>
            </div>

            <div class="bloo-body">
                <div class="bloo-content-step step-current">content 1</div>
                <div class="bloo-content-step">content 2</div>
                <div class="bloo-content-step">content 3</div>                
            </div>
            
            <button class="bloo-action-step bloo-finish">Finish!</button>
            <button class="bloo-action-step bloo-next"> &nbsp; > &nbsp; </button>
            <button class="bloo-action-step bloo-prev"> &nbsp; < &nbsp;</button>            

        </div>

    </div>

    <script src="bloowizard.js"></script>

    <script>

        const mineWzd = new BlooWizard("wzdDefault");

        mineWzd.on.beforeNext(function(wzd){ 
            console.log(wzd);            
        });

        mineWzd.on.finish(function(wzd){ 
            console.log(wzd);
            alert("finish!!"); 
        });

        mineWzd.on.change(function(wzd){ 
            console.log(wzd.currentStep);
        });

    </script>

</body>

</html>
```

---

#### Events
```js
    {
        beforeNext: (wzd) => {...},
        afterNext: (wzd) => {...},
        beforePrev: (wzd) => {...},
        afterPrev: (wzd) => {...},
        finish: (wzd) => {...},
        change: (wzd) => {..},
    }
```
---

#### Triggers

<table width="100%" style="text-align: center;">
  <thead>
    <tr>
      <td>Method</td>      
    </tr>
  </thead>
  <tbody>
    <tr><td>stop()</td></tr>
    <tr><td>continue()</td></tr>
    <tr><td>next()</td></tr>
    <tr><td>prev()</td></tr>
    <tr><td>runTo()</td></tr>
  </tbody>
</table>
