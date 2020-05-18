import {Component, OnInit} from '@angular/core';
import {MenuController, ToastController} from '@ionic/angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {CodeService} from '../../providers/code/code.service';
import {Router} from '@angular/router';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
@Component({
    selector: 'app-qr-code-scanner',
    templateUrl: './qr-code-scanner.page.html',
    styleUrls: ['./qr-code-scanner.page.scss'],
})

export class QrCodeScannerPage implements OnInit {
    constructor(
        private scanner: BarcodeScanner,
        // private qrScanner: QRScanner,
        private codeService: CodeService,
        private router: Router,
        private menu: MenuController,
        public toastController: ToastController

    ) {
    }

    ngOnInit() {
    }

    openMenu() {
        this.menu.enable(true, 'menu')
        this.menu.open('menu')
    }

    async openCameraForScan() {
        let result: any = await this.scanner.scan();
        console.log(result)
        this.codeService.code_check(result.text).subscribe(res => {
            console.log("response>>>> ", res.isExist)
            if (res.isExist === true) this.router.navigate(['/area'])
            else {
                this.presentToast('QR Code is not registered');
            }
        })

    }

    async presentToast(text) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000,
            position: 'top',
        });
        toast.present();
    }
}