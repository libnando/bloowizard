/* 
 * @license
 * bloowizard.js v1.0.0
 * Copyright 2019 Fernando Rosa <nando.megaman@gmail.com> All rights reserved.
 * Licensed under the BSD-2-Clause License. 
 */

const BlooWizard = function(elementId){

    const _this = this;
    const _element = document.getElementById(elementId);

    const _stepClassCurrent = "step-current";
    const _stepBtnClassNext = "bloo-next";
    const _stepBtnClassPrev = "bloo-prev";
    const _stepBtnClassFinish = "bloo-finish";
    const _stepLinkClass = "bloo-action-step";
    const _stepAttrIndex = "data-blooindex";
    const _stepLinks = _element.querySelectorAll(".".concat(_stepLinkClass));
    const _stepContents = _element.querySelectorAll(".bloo-content-step");
    const _steps = _stepContents.length;

    let _stopped = false;
    let _stepCurrentElement = null;
    let _isNextMode = false;
    
    _this.currentStep = 1;
    _this.element = _element;
    _this.steps = _steps;

    _this.stop = () => { _stopped=true; }
    _this.continue = () => { _stopped=false; }    
    _this.next = () => _fnNext();
    _this.prev = () => _fnPrev();
    _this.runTo = (step) => _fnRunTo(step);

    _stepContents.forEach((e, index) => {

        let mIndex = index+1;
        e.style.display = "none";
        e.setAttribute(_stepAttrIndex,mIndex);

        if(e.className.indexOf(_stepClassCurrent) > -1){
            _stepCurrentElement = e;
            _this.currentStep = mIndex;
            e.style.display = "unset";                 
        }

    });

    const _setClassCurrentElement = (e) => {
        e.className = e.className.replace(_stepClassCurrent, "").concat(" ".concat(_stepClassCurrent));              
    }

    const _delClassCurrentElement = (e) => {
        e.className = e.className.replace(_stepClassCurrent, "");
    }

    const _resolveVisibilityButtons = () => {
        _stepLinks.forEach(f => {
            
            if(f.className.indexOf(_stepBtnClassNext) > -1){
                f.style.display = (_this.currentStep < _this.steps) ? "initial" : "none";
            }
            
            if(f.className.indexOf(_stepBtnClassPrev) > -1){
                f.style.display = (_this.currentStep != 1) ? "initial" : "none";
            }
            
            if(f.className.indexOf(_stepBtnClassFinish) > -1){
                f.style.display = (_this.currentStep == _this.steps) ? "initial" : "none";
            }

        });
    };

    const _applyContext = (e) => {

        _delClassCurrentElement(_stepCurrentElement);
        _stepCurrentElement = e;
        _setClassCurrentElement(_stepCurrentElement);        
        _this.currentStep = parseInt(_stepCurrentElement.getAttribute(_stepAttrIndex));

        _stepContents.forEach(f => {
            f.style.display = "none";
            if(f.className.indexOf(_stepClassCurrent) > -1){
                f.style.display = "initial";
            }
        });

        _resolveVisibilityButtons();

    };

    const _fnEvent = (siblingElement) => {

        if(siblingElement == null){ return; }

        _applyContext(siblingElement);

    };

    const _fnNext = () => {        
        
        _events.beforeNext(_this);
        
        if(_this.currentStep == _this.steps || _stopped){ return; }        

        _fnEvent(_stepCurrentElement.nextElementSibling);    
        _resolveLinkCurrentElement();

        _events.afterNext(_this);
        _events.change(_this);

    };

    const _fnPrev = () => {
        
        _events.beforePrev(_this);

        if(_this.currentStep == 1 || _stopped){ return; }

        _fnEvent(_stepCurrentElement.previousElementSibling);    
        _resolveLinkCurrentElement();    

        _events.afterPrev(_this);
        _events.change(_this);

    };

    const _fnFinish = () => {
        _resolveLinkCurrentElement();
        _events.finish(_this);
    };

    const _fnRunTo = (step) => {
        _stepLinks.forEach(e => {
            if(parseInt(e.getAttribute(_stepAttrIndex)) == step){
                e.click();        
            }
        });    
    };

    const _resolveLinkCurrentElement = () => {
        _stepLinks.forEach(e => {
            _delClassCurrentElement(e);            
            if(parseInt(e.getAttribute(_stepAttrIndex)) == _this.currentStep){
                _setClassCurrentElement(e);                
            }
        });        
    };

    const _resolveStepsLinks = (e) => {

        _stepLinks.forEach(f => {
            
            let stepLink = e.getAttribute(_stepAttrIndex);
            _delClassCurrentElement(f);          

            if(f.getAttribute(_stepAttrIndex) == stepLink){
                
                if(_this.currentStep < parseInt(stepLink)){ 
                    _isNextMode = true;
                    _events.beforeNext(_this); 
                }else{
                    _isNextMode = false;
                    _events.beforePrev(_this);
                }

                if(_stopped){ return; }

                _setClassCurrentElement(e);                    

            }
        });
    };

    const _resolveStepsContents = (e) => {

        if(_stopped){ return; }

        _stepContents.forEach(f => {
            _delClassCurrentElement(f);            
            if(f.getAttribute(_stepAttrIndex) == e.getAttribute(_stepAttrIndex)){
                _applyContext(f);
                if(_isNextMode){ _events.afterNext(_this); }else{ _events.afterPrev(_this); }
                _events.change(_this);
            }
        });
    };

    const _eventHandlerClick = (e) => {

        if(e.className.indexOf(_stepBtnClassNext) > -1){
            _fnNext();
            return;
        }
        
        if(e.className.indexOf(_stepBtnClassPrev) > -1){
            _fnPrev();
            return;
        }
        
        if(e.className.indexOf(_stepBtnClassFinish) > -1){
            _fnFinish();
            return;            
        }

        if(e.className.indexOf(_stepClassCurrent) > -1){
            return;
        }

        _resolveStepsLinks(e);
        _resolveStepsContents(e);

    };

    _stepLinks.forEach((e, index) => {

        let mIndex = index+1;
        e.setAttribute(_stepAttrIndex,mIndex);
        e.addEventListener("click", () => { _eventHandlerClick(e); }, false);

    });

    const _events = {
        beforeNext: (wzd) => {},
        afterNext: (wzd) => {},
        beforePrev: (wzd) => {},
        afterPrev: (wzd) => {},
        finish: (wzd) => {},
        change: (wzd) => {},
    };

    _this.on = (() => {
        return {
            beforeNext : (fn) => { _events.beforeNext = fn; },
            afterNext : (fn) => { _events.afterNext = fn; },
            beforePrev : (fn) => { _events.beforePrev = fn; },
            afterPrev : (fn) => { _events.afterPrev = fn; },
            finish: (fn) => { _events.finish = fn; },
            change: (fn) => { _events.change = fn; },
        };
    })();

    _resolveVisibilityButtons();

    return _this;

};