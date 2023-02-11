export default class RateLimiter {
    private rateLimit!: number;
    private rateLimitCounter!: number;
    private rateLimitTimestamp!: number;
    private rateLimitPeriod!: number;
  
    constructor() {
      this.initialize();
    }
  
    public isRateLimitReached(): boolean {
      if (Date.now() - this.rateLimitTimestamp >= this.rateLimitPeriod) {
        this.rateLimitCounter = 0;
        this.rateLimitTimestamp = Date.now();
      }
      if (this.rateLimitCounter < this.rateLimit) {
        this.rateLimitCounter++;
        return false;
      } else return true;
    }
  
    public initialize() {
      // Set declared variables
      this.rateLimit = 10;
      this.rateLimitCounter = 0;
      this.rateLimitTimestamp = Date.now();
      this.rateLimitPeriod = 60000; // 1 minute
    }
  }
  