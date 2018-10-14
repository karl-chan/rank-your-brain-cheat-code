const play = function() {
    const before = $('#beforeAnswer').text().trim()
    const after = $('#afterAnswer').text().trim()
    const oppositeOps = {
        '+': '-',
        '-': '+',
        '*': '/',
        '/': '*'
    }
    let ans
    if (!before) {
        // e.g.  + 3 = 5
        const op = after.charAt(0)
        const [fst, snd] = after.substring(1).split('=')   
        const newOp = oppositeOps[op]
        ans = eval(`(${snd}) ${newOp} (${fst})`)
    } else if (!after) {
        // e.g. 2 + 3 = 
        const [fst, op, snd] = before.substring(0, before.length - 1).split(' ')
        ans = eval(`(${fst}) ${op} (${snd})`)
    } else {
        // e.g. 2 + ? = 5
        const op = before.charAt(before.length - 1)
        const fst = before.substring(0, before.length - 1)
        const snd = after.substring(1)
        const newOp = oppositeOps[op]
        const cmd = ['-', '/'].includes(op)? `(${fst}) ${op} (${snd})`: `(${snd}) ${newOp} (${fst})`
        ans = eval(cmd)
    }
    $('#answer').val(ans)
    $('#answer').trigger('keyup')
}

setInterval(play, 0)
