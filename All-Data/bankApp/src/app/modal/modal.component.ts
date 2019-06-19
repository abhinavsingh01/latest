import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalserviceService } from '../modalservice.service';

@Component({
    selector: 'bk-modal',
    template: 
        `<div class="bk-modal">
            <div class="bk-modal-body">
                <ng-content></ng-content>
            </div>
        </div>
        <div class="bk-modal-background"></div>`
})

export class ModalComponent implements OnInit, OnDestroy {
	@Input() msg: string;
    @Input() id: string;
    private element: any;

    constructor(private modalService: ModalserviceService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        let modal = this;

        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', function (e: any) {
            if (e.target.className === 'bk-modal') {
                modal.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('bk-modal-open');
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('bk-modal-open');
    }
}