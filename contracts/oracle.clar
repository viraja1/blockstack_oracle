(define-data-var bitcoin-price int 0)
(define-data-var oracle-address principal 'ST35QB1XF7211FWZXSVDFE7WT38S2QYCS1XFN0QD0)
(define-data-var contract-owner principal 'ST35QB1XF7211FWZXSVDFE7WT38S2QYCS1XFN0QD0)


(define-read-only (get-bitcoin-price)
   (ok (var-get bitcoin-price)))


(define-read-only (get-oracle-address)
   (ok (var-get oracle-address)))


(define-public (update-bitcoin-price (price int))
   (let ((oracle (var-get oracle-address)))
   (if (is-eq oracle tx-sender)
     (begin
        (var-set bitcoin-price price)
        (ok true)
     )
     (ok false)
   )
   ))


(define-public (update-oracle-address (address principal))
    (let ((owner (var-get contract-owner)))
    (if (is-eq tx-sender owner)
     (begin
        (var-set oracle-address address)
        (ok true)
     )
     (ok false)
    )
    ))