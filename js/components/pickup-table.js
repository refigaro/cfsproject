class PickupWindowHoursTable extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="card-body text-left font-family-sora px-0">
            <h5 class="type-h6 card-title text-2xl font-family-sora mb-2">Pickup Window Hours</h5>
            <table class="card-text type-body-sm text-muted w-100">
                <tbody>
                    <tr>
                        <td>Monday</td>
                        <td class="ar">7:00AM–6:00PM</td>
                    </tr>
                    <tr>
                        <td>Tuesday</td>
                        <td class="ar">7:00AM–6:00PM</td>
                    </tr>
                    <tr>
                        <td>Wednesday</td>
                        <td class="ar">7:00AM–6:00PM</td>
                    </tr>
                    <tr>
                        <td>Thursday</td>
                        <td class="ar">7:00AM–6:00PM</td>
                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td class="ar">7:00AM–6:00PM</td>
                    </tr>
                    <tr>
                        <td>Saturday</td>
                        <td class="ar">Closed</td>
                    </tr>
                    <tr>
                        <td>Sunday</td>
                        <td class="ar">Closed</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
    }
}

customElements.define('pickup-window-hours-table', PickupWindowHoursTable);