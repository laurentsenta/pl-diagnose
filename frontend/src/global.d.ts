import { BrowserMetricsProvider } from '@ipfs-shipyard/ignite-metrics';

declare global {
    var telemetry: InstanceType<BrowserMetricsProvider>;
    var addMetricsConsent: () => void;
    var removeMetricsConsent: () => void;
}
