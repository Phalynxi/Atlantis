// ==UserScript==
// @name            Atlantis
// @author          .3z
// @description     try to take over the world!
// @icon            https://chatgpt.com/backend-api/estuary/public_content/enc/eyJpZCI6Im1fNjljNGRmMTNjN2NjODE5MTk5NGI4ZGJlZGU1MWJjNTk6ZmlsZV8wMDAwMDAwMDc5Yjg3MWZkOWQ0MzZkMjVlNTc3MGU5ZSIsInRzIjoiMjA1MzgiLCJwIjoicHlpIiwiY2lkIjoiMSIsInNpZyI6IjQwMjUyOWFkZTg5ZTFkODU2NWM3MjA1NTU4NmJhMGM1OTNhYzhhMGU3NDE4MWNjZjFhZjY4YTBjZThjYTA1OWYiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsLCJjcyI6bnVsbCwiY2RuIjpudWxsLCJjcCI6bnVsbCwibWEiOm51bGx9
// @version         1.5
// @match           *://*.moomoo.io/*
// @run-at          document-start
// @grant           none
// ==/UserScript==

(function () {
  function easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
  }

  function shortAngle(a, b) {
    let PI22 = 2 * Math.PI;
    ((a = ((a % PI22) + PI22) % PI22), (b = ((b % PI22) + PI22) % PI22));
    let diff = b - a;
    if (diff > PI22 / 2) {
      diff -= PI22;
    } else if (diff < -PI22 / 2) {
      diff += PI22;
    }
    return diff;
  }

  class Altcha {
    coreCount = Math.min(16, navigator.hardwareConcurrency || 8);
    workers = [];
    blobUrl = null;
    initPool(challenge, salt) {
      if (this.workers.length > 0) {
        return;
      }
      let workerCode = `\n            ${atob("IWZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIHQodCxpKXtpPyhkWzBdPWRbMTZdPWRbMV09ZFsyXT1kWzNdPWRbNF09ZFs1XT1kWzZdPWRbN109ZFs4XT1kWzldPWRbMTBdPWRbMTFdPWRbMTJdPWRbMTNdPWRbMTRdPWRbMTVdPTAsdGhpcy5ibG9ja3M9ZCk6dGhpcy5ibG9ja3M9WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sdD8odGhpcy5oMD0zMjM4MzcxMDMyLHRoaXMuaDE9OTE0MTUwNjYzLHRoaXMuaDI9ODEyNzAyOTk5LHRoaXMuaDM9NDE0NDkxMjY5Nyx0aGlzLmg0PTQyOTA3NzU4NTcsdGhpcy5oNT0xNzUwNjAzMDI1LHRoaXMuaDY9MTY5NDA3NjgzOSx0aGlzLmg3PTMyMDQwNzU0MjgpOih0aGlzLmgwPTE3NzkwMzM3MDMsdGhpcy5oMT0zMTQ0MTM0Mjc3LHRoaXMuaDI9MTAxMzkwNDI0Mix0aGlzLmgzPTI3NzM0ODA3NjIsdGhpcy5oND0xMzU5ODkzMTE5LHRoaXMuaDU9MjYwMDgyMjkyNCx0aGlzLmg2PTUyODczNDYzNSx0aGlzLmg3PTE1NDE0NTkyMjUpLHRoaXMuYmxvY2s9dGhpcy5zdGFydD10aGlzLmJ5dGVzPXRoaXMuaEJ5dGVzPTAsdGhpcy5maW5hbGl6ZWQ9dGhpcy5oYXNoZWQ9ITEsdGhpcy5maXJzdD0hMCx0aGlzLmlzMjI0PXR9ZnVuY3Rpb24gaShpLHIscyl7dmFyIGUsbj10eXBlb2YgaTtpZigic3RyaW5nIj09PW4pe3ZhciBvLGE9W10sdT1pLmxlbmd0aCxjPTA7Zm9yKGU9MDtlPHU7KytlKShvPWkuY2hhckNvZGVBdChlKSk8MTI4P2FbYysrXT1vOm88MjA0OD8oYVtjKytdPTE5MnxvPj42LGFbYysrXT0xMjh8NjMmbyk6bzw1NTI5Nnx8bz49NTczNDQ/KGFbYysrXT0yMjR8bz4+MTIsYVtjKytdPTEyOHxvPj42JjYzLGFbYysrXT0xMjh8NjMmbyk6KG89NjU1MzYrKCgxMDIzJm8pPDwxMHwxMDIzJmkuY2hhckNvZGVBdCgrK2UpKSxhW2MrK109MjQwfG8+PjE4LGFbYysrXT0xMjh8bz4+MTImNjMsYVtjKytdPTEyOHxvPj42JjYzLGFbYysrXT0xMjh8NjMmbyk7aT1hfWVsc2V7aWYoIm9iamVjdCIhPT1uKXRocm93IG5ldyBFcnJvcihoKTtpZihudWxsPT09aSl0aHJvdyBuZXcgRXJyb3IoaCk7aWYoZiYmaS5jb25zdHJ1Y3Rvcj09PUFycmF5QnVmZmVyKWk9bmV3IFVpbnQ4QXJyYXkoaSk7ZWxzZSBpZighKEFycmF5LmlzQXJyYXkoaSl8fGYmJkFycmF5QnVmZmVyLmlzVmlldyhpKSkpdGhyb3cgbmV3IEVycm9yKGgpfWkubGVuZ3RoPjY0JiYoaT1uZXcgdChyLCEwKS51cGRhdGUoaSkuYXJyYXkoKSk7dmFyIHk9W10scD1bXTtmb3IoZT0wO2U8NjQ7KytlKXt2YXIgbD1pW2VdfHwwO3lbZV09OTJebCxwW2VdPTU0Xmx9dC5jYWxsKHRoaXMscixzKSx0aGlzLnVwZGF0ZShwKSx0aGlzLm9LZXlQYWQ9eSx0aGlzLmlubmVyPSEwLHRoaXMuc2hhcmVkTWVtb3J5PXN9dmFyIGg9ImlucHV0IGlzIGludmFsaWQgdHlwZSIscj0ib2JqZWN0Ij09dHlwZW9mIHdpbmRvdyxzPXI/d2luZG93Ont9O3MuSlNfU0hBMjU2X05PX1dJTkRPVyYmKHI9ITEpO3ZhciBlPSFyJiYib2JqZWN0Ij09dHlwZW9mIHNlbGYsbj0hcy5KU19TSEEyNTZfTk9fTk9ERV9KUyYmIm9iamVjdCI9PXR5cGVvZiBwcm9jZXNzJiZwcm9jZXNzLnZlcnNpb25zJiZwcm9jZXNzLnZlcnNpb25zLm5vZGU7bj9zPWdsb2JhbDplJiYocz1zZWxmKTt2YXIgbz0hcy5KU19TSEEyNTZfTk9fQ09NTU9OX0pTJiYib2JqZWN0Ij09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHMsYT0iZnVuY3Rpb24iPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kLGY9IXMuSlNfU0hBMjU2X05PX0FSUkFZX0JVRkZFUiYmInVuZGVmaW5lZCIhPXR5cGVvZiBBcnJheUJ1ZmZlcix1PSIwMTIzNDU2Nzg5YWJjZGVmIi5zcGxpdCgiIiksYz1bLTIxNDc0ODM2NDgsODM4ODYwOCwzMjc2OCwxMjhdLHk9WzI0LDE2LDgsMF0scD1bMTExNjM1MjQwOCwxODk5NDQ3NDQxLDMwNDkzMjM0NzEsMzkyMTAwOTU3Myw5NjE5ODcxNjMsMTUwODk3MDk5MywyNDUzNjM1NzQ4LDI4NzA3NjMyMjEsMzYyNDM4MTA4MCwzMTA1OTg0MDEsNjA3MjI1Mjc4LDE0MjY4ODE5ODcsMTkyNTA3ODM4OCwyMTYyMDc4MjA2LDI2MTQ4ODgxMDMsMzI0ODIyMjU4MCwzODM1MzkwNDAxLDQwMjIyMjQ3NzQsMjY0MzQ3MDc4LDYwNDgwNzYyOCw3NzAyNTU5ODMsMTI0OTE1MDEyMiwxNTU1MDgxNjkyLDE5OTYwNjQ5ODYsMjU1NDIyMDg4MiwyODIxODM0MzQ5LDI5NTI5OTY4MDgsMzIxMDMxMzY3MSwzMzM2NTcxODkxLDM1ODQ1Mjg3MTEsMTEzOTI2OTkzLDMzODI0MTg5NSw2NjYzMDcyMDUsNzczNTI5OTEyLDEyOTQ3NTczNzIsMTM5NjE4MjI5MSwxNjk1MTgzNzAwLDE5ODY2NjEwNTEsMjE3NzAyNjM1MCwyNDU2OTU2MDM3LDI3MzA0ODU5MjEsMjgyMDMwMjQxMSwzMjU5NzMwODAwLDMzNDU3NjQ3NzEsMzUxNjA2NTgxNywzNjAwMzUyODA0LDQwOTQ1NzE5MDksMjc1NDIzMzQ0LDQzMDIyNzczNCw1MDY5NDg2MTYsNjU5MDYwNTU2LDg4Mzk5Nzg3Nyw5NTgxMzk1NzEsMTMyMjgyMjIxOCwxNTM3MDAyMDYzLDE3NDc4NzM3NzksMTk1NTU2MjIyMiwyMDI0MTA0ODE1LDIyMjc3MzA0NTIsMjM2MTg1MjQyNCwyNDI4NDM2NDc0LDI3NTY3MzQxODcsMzIwNDAzMTQ3OSwzMzI5MzI1Mjk4XSxsPVsiaGV4IiwiYXJyYXkiLCJkaWdlc3QiLCJhcnJheUJ1ZmZlciJdLGQ9W107IXMuSlNfU0hBMjU2X05PX05PREVfSlMmJkFycmF5LmlzQXJyYXl8fChBcnJheS5pc0FycmF5PWZ1bmN0aW9uKHQpe3JldHVybiJbb2JqZWN0IEFycmF5XSI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodCl9KSwhZnx8IXMuSlNfU0hBMjU2X05PX0FSUkFZX0JVRkZFUl9JU19WSUVXJiZBcnJheUJ1ZmZlci5pc1ZpZXd8fChBcnJheUJ1ZmZlci5pc1ZpZXc9ZnVuY3Rpb24odCl7cmV0dXJuIm9iamVjdCI9PXR5cGVvZiB0JiZ0LmJ1ZmZlciYmdC5idWZmZXIuY29uc3RydWN0b3I9PT1BcnJheUJ1ZmZlcn0pO3ZhciBBPWZ1bmN0aW9uKGksaCl7cmV0dXJuIGZ1bmN0aW9uKHIpe3JldHVybiBuZXcgdChoLCEwKS51cGRhdGUocilbaV0oKX19LHc9ZnVuY3Rpb24oaSl7dmFyIGg9QSgiaGV4IixpKTtuJiYoaD1iKGgsaSkpLGguY3JlYXRlPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyB0KGkpfSxoLnVwZGF0ZT1mdW5jdGlvbih0KXtyZXR1cm4gaC5jcmVhdGUoKS51cGRhdGUodCl9O2Zvcih2YXIgcj0wO3I8bC5sZW5ndGg7KytyKXt2YXIgcz1sW3JdO2hbc109QShzLGkpfXJldHVybiBofSxiPWZ1bmN0aW9uKHQsaSl7dmFyIHI9ZXZhbCgicmVxdWlyZSgnY3J5cHRvJykiKSxzPWV2YWwoInJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlciIpLGU9aT8ic2hhMjI0Ijoic2hhMjU2IixuPWZ1bmN0aW9uKGkpe2lmKCJzdHJpbmciPT10eXBlb2YgaSlyZXR1cm4gci5jcmVhdGVIYXNoKGUpLnVwZGF0ZShpLCJ1dGY4IikuZGlnZXN0KCJoZXgiKTtpZihudWxsPT09aXx8dm9pZCAwPT09aSl0aHJvdyBuZXcgRXJyb3IoaCk7cmV0dXJuIGkuY29uc3RydWN0b3I9PT1BcnJheUJ1ZmZlciYmKGk9bmV3IFVpbnQ4QXJyYXkoaSkpLEFycmF5LmlzQXJyYXkoaSl8fEFycmF5QnVmZmVyLmlzVmlldyhpKXx8aS5jb25zdHJ1Y3Rvcj09PXM/ci5jcmVhdGVIYXNoKGUpLnVwZGF0ZShuZXcgcyhpKSkuZGlnZXN0KCJoZXgiKTp0KGkpfTtyZXR1cm4gbn0sdj1mdW5jdGlvbih0LGgpe3JldHVybiBmdW5jdGlvbihyLHMpe3JldHVybiBuZXcgaShyLGgsITApLnVwZGF0ZShzKVt0XSgpfX0sXz1mdW5jdGlvbih0KXt2YXIgaD12KCJoZXgiLHQpO2guY3JlYXRlPWZ1bmN0aW9uKGgpe3JldHVybiBuZXcgaShoLHQpfSxoLnVwZGF0ZT1mdW5jdGlvbih0LGkpe3JldHVybiBoLmNyZWF0ZSh0KS51cGRhdGUoaSl9O2Zvcih2YXIgcj0wO3I8bC5sZW5ndGg7KytyKXt2YXIgcz1sW3JdO2hbc109dihzLHQpfXJldHVybiBofTt0LnByb3RvdHlwZS51cGRhdGU9ZnVuY3Rpb24odCl7aWYoIXRoaXMuZmluYWxpemVkKXt2YXIgaSxyPXR5cGVvZiB0O2lmKCJzdHJpbmciIT09cil7aWYoIm9iamVjdCIhPT1yKXRocm93IG5ldyBFcnJvcihoKTtpZihudWxsPT09dCl0aHJvdyBuZXcgRXJyb3IoaCk7aWYoZiYmdC5jb25zdHJ1Y3Rvcj09PUFycmF5QnVmZmVyKXQ9bmV3IFVpbnQ4QXJyYXkodCk7ZWxzZSBpZighKEFycmF5LmlzQXJyYXkodCl8fGYmJkFycmF5QnVmZmVyLmlzVmlldyh0KSkpdGhyb3cgbmV3IEVycm9yKGgpO2k9ITB9Zm9yKHZhciBzLGUsbj0wLG89dC5sZW5ndGgsYT10aGlzLmJsb2NrcztuPG87KXtpZih0aGlzLmhhc2hlZCYmKHRoaXMuaGFzaGVkPSExLGFbMF09dGhpcy5ibG9jayxhWzE2XT1hWzFdPWFbMl09YVszXT1hWzRdPWFbNV09YVs2XT1hWzddPWFbOF09YVs5XT1hWzEwXT1hWzExXT1hWzEyXT1hWzEzXT1hWzE0XT1hWzE1XT0wKSxpKWZvcihlPXRoaXMuc3RhcnQ7bjxvJiZlPDY0OysrbilhW2U+PjJdfD10W25dPDx5WzMmZSsrXTtlbHNlIGZvcihlPXRoaXMuc3RhcnQ7bjxvJiZlPDY0Oysrbikocz10LmNoYXJDb2RlQXQobikpPDEyOD9hW2U+PjJdfD1zPDx5WzMmZSsrXTpzPDIwNDg/KGFbZT4+Ml18PSgxOTJ8cz4+Nik8PHlbMyZlKytdLGFbZT4+Ml18PSgxMjh8NjMmcyk8PHlbMyZlKytdKTpzPDU1Mjk2fHxzPj01NzM0ND8oYVtlPj4yXXw9KDIyNHxzPj4xMik8PHlbMyZlKytdLGFbZT4+Ml18PSgxMjh8cz4+NiY2Myk8PHlbMyZlKytdLGFbZT4+Ml18PSgxMjh8NjMmcyk8PHlbMyZlKytdKToocz02NTUzNisoKDEwMjMmcyk8PDEwfDEwMjMmdC5jaGFyQ29kZUF0KCsrbikpLGFbZT4+Ml18PSgyNDB8cz4+MTgpPDx5WzMmZSsrXSxhW2U+PjJdfD0oMTI4fHM+PjEyJjYzKTw8eVszJmUrK10sYVtlPj4yXXw9KDEyOHxzPj42JjYzKTw8eVszJmUrK10sYVtlPj4yXXw9KDEyOHw2MyZzKTw8eVszJmUrK10pO3RoaXMubGFzdEJ5dGVJbmRleD1lLHRoaXMuYnl0ZXMrPWUtdGhpcy5zdGFydCxlPj02ND8odGhpcy5ibG9jaz1hWzE2XSx0aGlzLnN0YXJ0PWUtNjQsdGhpcy5oYXNoKCksdGhpcy5oYXNoZWQ9ITApOnRoaXMuc3RhcnQ9ZX1yZXR1cm4gdGhpcy5ieXRlcz40Mjk0OTY3Mjk1JiYodGhpcy5oQnl0ZXMrPXRoaXMuYnl0ZXMvNDI5NDk2NzI5Njw8MCx0aGlzLmJ5dGVzPXRoaXMuYnl0ZXMlNDI5NDk2NzI5NiksdGhpc319LHQucHJvdG90eXBlLmZpbmFsaXplPWZ1bmN0aW9uKCl7aWYoIXRoaXMuZmluYWxpemVkKXt0aGlzLmZpbmFsaXplZD0hMDt2YXIgdD10aGlzLmJsb2NrcyxpPXRoaXMubGFzdEJ5dGVJbmRleDt0WzE2XT10aGlzLmJsb2NrLHRbaT4+Ml18PWNbMyZpXSx0aGlzLmJsb2NrPXRbMTZdLGk+PTU2JiYodGhpcy5oYXNoZWR8fHRoaXMuaGFzaCgpLHRbMF09dGhpcy5ibG9jayx0WzE2XT10WzFdPXRbMl09dFszXT10WzRdPXRbNV09dFs2XT10WzddPXRbOF09dFs5XT10WzEwXT10WzExXT10WzEyXT10WzEzXT10WzE0XT10WzE1XT0wKSx0WzE0XT10aGlzLmhCeXRlczw8M3x0aGlzLmJ5dGVzPj4+MjksdFsxNV09dGhpcy5ieXRlczw8Myx0aGlzLmhhc2goKX19LHQucHJvdG90eXBlLmhhc2g9ZnVuY3Rpb24oKXt2YXIgdCxpLGgscixzLGUsbixvLGEsZj10aGlzLmgwLHU9dGhpcy5oMSxjPXRoaXMuaDIseT10aGlzLmgzLGw9dGhpcy5oNCxkPXRoaXMuaDUsQT10aGlzLmg2LHc9dGhpcy5oNyxiPXRoaXMuYmxvY2tzO2Zvcih0PTE2O3Q8NjQ7Kyt0KWk9KChzPWJbdC0xNV0pPj4+N3xzPDwyNSleKHM+Pj4xOHxzPDwxNClecz4+PjMsaD0oKHM9Ylt0LTJdKT4+PjE3fHM8PDE1KV4ocz4+PjE5fHM8PDEzKV5zPj4+MTAsYlt0XT1iW3QtMTZdK2krYlt0LTddK2g8PDA7Zm9yKGE9dSZjLHQ9MDt0PDY0O3QrPTQpdGhpcy5maXJzdD8odGhpcy5pczIyND8oZT0zMDAwMzIsdz0ocz1iWzBdLTE0MTMyNTc4MTkpLTE1MDA1NDU5OTw8MCx5PXMrMjQxNzcwNzc8PDApOihlPTcwNDc1MTEwOSx3PShzPWJbMF0tMjEwMjQ0MjQ4KS0xNTIxNDg2NTM0PDwwLHk9cysxNDM2OTQ1NjU8PDApLHRoaXMuZmlyc3Q9ITEpOihpPShmPj4+MnxmPDwzMCleKGY+Pj4xM3xmPDwxOSleKGY+Pj4yMnxmPDwxMCkscj0oZT1mJnUpXmYmY15hLHc9eSsocz13KyhoPShsPj4+NnxsPDwyNileKGw+Pj4xMXxsPDwyMSleKGw+Pj4yNXxsPDw3KSkrKGwmZF5+bCZBKStwW3RdK2JbdF0pPDwwLHk9cysoaStyKTw8MCksaT0oeT4+PjJ8eTw8MzApXih5Pj4+MTN8eTw8MTkpXih5Pj4+MjJ8eTw8MTApLHI9KG49eSZmKV55JnVeZSxBPWMrKHM9QSsoaD0odz4+PjZ8dzw8MjYpXih3Pj4+MTF8dzw8MjEpXih3Pj4+MjV8dzw8NykpKyh3JmxefncmZCkrcFt0KzFdK2JbdCsxXSk8PDAsaT0oKGM9cysoaStyKTw8MCk+Pj4yfGM8PDMwKV4oYz4+PjEzfGM8PDE5KV4oYz4+PjIyfGM8PDEwKSxyPShvPWMmeSleYyZmXm4sZD11KyhzPWQrKGg9KEE+Pj42fEE8PDI2KV4oQT4+PjExfEE8PDIxKV4oQT4+PjI1fEE8PDcpKSsoQSZ3Xn5BJmwpK3BbdCsyXStiW3QrMl0pPDwwLGk9KCh1PXMrKGkrcik8PDApPj4+Mnx1PDwzMCleKHU+Pj4xM3x1PDwxOSleKHU+Pj4yMnx1PDwxMCkscj0oYT11JmMpXnUmeV5vLGw9Zisocz1sKyhoPShkPj4+NnxkPDwyNileKGQ+Pj4xMXxkPDwyMSleKGQ+Pj4yNXxkPDw3KSkrKGQmQV5+ZCZ3KStwW3QrM10rYlt0KzNdKTw8MCxmPXMrKGkrcik8PDA7dGhpcy5oMD10aGlzLmgwK2Y8PDAsdGhpcy5oMT10aGlzLmgxK3U8PDAsdGhpcy5oMj10aGlzLmgyK2M8PDAsdGhpcy5oMz10aGlzLmgzK3k8PDAsdGhpcy5oND10aGlzLmg0K2w8PDAsdGhpcy5oNT10aGlzLmg1K2Q8PDAsdGhpcy5oNj10aGlzLmg2K0E8PDAsdGhpcy5oNz10aGlzLmg3K3c8PDB9LHQucHJvdG90eXBlLmhleD1mdW5jdGlvbigpe3RoaXMuZmluYWxpemUoKTt2YXIgdD10aGlzLmgwLGk9dGhpcy5oMSxoPXRoaXMuaDIscj10aGlzLmgzLHM9dGhpcy5oNCxlPXRoaXMuaDUsbj10aGlzLmg2LG89dGhpcy5oNyxhPXVbdD4+MjgmMTVdK3VbdD4+MjQmMTVdK3VbdD4+MjAmMTVdK3VbdD4+MTYmMTVdK3VbdD4+MTImMTVdK3VbdD4+OCYxNV0rdVt0Pj40JjE1XSt1WzE1JnRdK3VbaT4+MjgmMTVdK3VbaT4+MjQmMTVdK3VbaT4+MjAmMTVdK3VbaT4+MTYmMTVdK3VbaT4+MTImMTVdK3VbaT4+OCYxNV0rdVtpPj40JjE1XSt1WzE1JmldK3VbaD4+MjgmMTVdK3VbaD4+MjQmMTVdK3VbaD4+MjAmMTVdK3VbaD4+MTYmMTVdK3VbaD4+MTImMTVdK3VbaD4+OCYxNV0rdVtoPj40JjE1XSt1WzE1JmhdK3Vbcj4+MjgmMTVdK3Vbcj4+MjQmMTVdK3Vbcj4+MjAmMTVdK3Vbcj4+MTYmMTVdK3Vbcj4+MTImMTVdK3Vbcj4+OCYxNV0rdVtyPj40JjE1XSt1WzE1JnJdK3Vbcz4+MjgmMTVdK3Vbcz4+MjQmMTVdK3Vbcz4+MjAmMTVdK3Vbcz4+MTYmMTVdK3Vbcz4+MTImMTVdK3Vbcz4+OCYxNV0rdVtzPj40JjE1XSt1WzE1JnNdK3VbZT4+MjgmMTVdK3VbZT4+MjQmMTVdK3VbZT4+MjAmMTVdK3VbZT4+MTYmMTVdK3VbZT4+MTImMTVdK3VbZT4+OCYxNV0rdVtlPj40JjE1XSt1WzE1JmVdK3Vbbj4+MjgmMTVdK3Vbbj4+MjQmMTVdK3Vbbj4+MjAmMTVdK3Vbbj4+MTYmMTVdK3Vbbj4+MTImMTVdK3Vbbj4+OCYxNV0rdVtuPj40JjE1XSt1WzE1Jm5dO3JldHVybiB0aGlzLmlzMjI0fHwoYSs9dVtvPj4yOCYxNV0rdVtvPj4yNCYxNV0rdVtvPj4yMCYxNV0rdVtvPj4xNiYxNV0rdVtvPj4xMiYxNV0rdVtvPj44JjE1XSt1W28+PjQmMTVdK3VbMTUmb10pLGF9LHQucHJvdG90eXBlLnRvU3RyaW5nPXQucHJvdG90eXBlLmhleCx0LnByb3RvdHlwZS5kaWdlc3Q9ZnVuY3Rpb24oKXt0aGlzLmZpbmFsaXplKCk7dmFyIHQ9dGhpcy5oMCxpPXRoaXMuaDEsaD10aGlzLmgyLHI9dGhpcy5oMyxzPXRoaXMuaDQsZT10aGlzLmg1LG49dGhpcy5oNixvPXRoaXMuaDcsYT1bdD4+MjQmMjU1LHQ+PjE2JjI1NSx0Pj44JjI1NSwyNTUmdCxpPj4yNCYyNTUsaT4+MTYmMjU1LGk+PjgmMjU1LDI1NSZpLGg+PjI0JjI1NSxoPj4xNiYyNTUsaD4+OCYyNTUsMjU1Jmgscj4+MjQmMjU1LHI+PjE2JjI1NSxyPj44JjI1NSwyNTUmcixzPj4yNCYyNTUscz4+MTYmMjU1LHM+PjgmMjU1LDI1NSZzLGU+PjI0JjI1NSxlPj4xNiYyNTUsZT4+OCYyNTUsMjU1JmUsbj4+MjQmMjU1LG4+PjE2JjI1NSxuPj44JjI1NSwyNTUmbl07cmV0dXJuIHRoaXMuaXMyMjR8fGEucHVzaChvPj4yNCYyNTUsbz4+MTYmMjU1LG8+PjgmMjU1LDI1NSZvKSxhfSx0LnByb3RvdHlwZS5hcnJheT10LnByb3RvdHlwZS5kaWdlc3QsdC5wcm90b3R5cGUuYXJyYXlCdWZmZXI9ZnVuY3Rpb24oKXt0aGlzLmZpbmFsaXplKCk7dmFyIHQ9bmV3IEFycmF5QnVmZmVyKHRoaXMuaXMyMjQ/Mjg6MzIpLGk9bmV3IERhdGFWaWV3KHQpO3JldHVybiBpLnNldFVpbnQzMigwLHRoaXMuaDApLGkuc2V0VWludDMyKDQsdGhpcy5oMSksaS5zZXRVaW50MzIoOCx0aGlzLmgyKSxpLnNldFVpbnQzMigxMix0aGlzLmgzKSxpLnNldFVpbnQzMigxNix0aGlzLmg0KSxpLnNldFVpbnQzMigyMCx0aGlzLmg1KSxpLnNldFVpbnQzMigyNCx0aGlzLmg2KSx0aGlzLmlzMjI0fHxpLnNldFVpbnQzMigyOCx0aGlzLmg3KSx0fSxpLnByb3RvdHlwZT1uZXcgdCxpLnByb3RvdHlwZS5maW5hbGl6ZT1mdW5jdGlvbigpe2lmKHQucHJvdG90eXBlLmZpbmFsaXplLmNhbGwodGhpcyksdGhpcy5pbm5lcil7dGhpcy5pbm5lcj0hMTt2YXIgaT10aGlzLmFycmF5KCk7dC5jYWxsKHRoaXMsdGhpcy5pczIyNCx0aGlzLnNoYXJlZE1lbW9yeSksdGhpcy51cGRhdGUodGhpcy5vS2V5UGFkKSx0aGlzLnVwZGF0ZShpKSx0LnByb3RvdHlwZS5maW5hbGl6ZS5jYWxsKHRoaXMpfX07dmFyIEI9dygpO0Iuc2hhMjU2PUIsQi5zaGEyMjQ9dyghMCksQi5zaGEyNTYuaG1hYz1fKCksQi5zaGEyMjQuaG1hYz1fKCEwKSxvP21vZHVsZS5leHBvcnRzPUI6KHMuc2hhMjU2PUIuc2hhMjU2LHMuc2hhMjI0PUIuc2hhMjI0LGEmJmRlZmluZShmdW5jdGlvbigpe3JldHVybiBCfSkpfSgpOw==")}\n            // let challenge = null, salt = null;\n            self.onmessage = e => {\n                const d = e.data;\n                if (d.init) { challenge = d.challenge; salt = d.salt; return; }\n                const { start, end } = d;\n                for (let i = start; i <= end; i++) {\n                    if (sha256(salt + i) === challenge) {\n                        postMessage(i);\n                        return;\n                    }\n                }\n                postMessage(null);\n            };\n        `;
      this.blobUrl = URL.createObjectURL(
        new Blob([workerCode], {
          type: "application/javascript",
        }),
      );
      for (let i = 0; i < this.coreCount; i++) {
        (this.workers.push(new Worker(this.blobUrl)),
          this.workers[i].postMessage({
            init: !0,
            challenge: challenge,
            salt: salt,
          }));
      }
    }
    async getChallenge() {
      return (await fetch("https://api.moomoo.io/verify")).json();
    }
    async solve(chal) {
      let { challenge: challenge, salt: salt, maxnumber: maxnumber } = chal;
      this.initPool(challenge, salt);
      let segSize = Math.ceil(maxnumber / this.coreCount);
      return new Promise((resolve, reject) => {
        let solved = !1,
          done = 0,
          startTime = performance.now();
        this.workers.forEach((worker, idx) => {
          let s = idx * segSize,
            e = Math.min(maxnumber, (idx + 1) * segSize - 1);
          ((worker.onmessage = (msg) => {
            if (solved) {
              return;
            }
            let number = msg.data;
            if (number !== null) {
              solved = !0;
              let took = ((performance.now() - startTime) / 1e3).toFixed(2);
              (resolve({
                number: number,
                took: took,
              }),
                this.cleanup());
            } else if ((done++, !solved && done === this.coreCount)) {
              (reject(Error("Not solved")), this.cleanup());
            }
          }),
            (worker.onerror = (err) => {
              if (!solved) {
                reject(err);
              }
              this.cleanup();
            }),
            worker.postMessage({
              start: s,
              end: e,
            }));
        });
      });
    }
    cleanup() {
      if (
        (this.workers.forEach((w) => w.terminate()),
          (this.workers.length = 0),
          this.blobUrl)
      ) {
        URL.revokeObjectURL(this.blobUrl);
      }
      this.blobUrl = null;
    }
    static makePayload(chal, result) {
      return btoa(
        JSON.stringify({
          algorithm: "SHA-256",
          challenge: chal.challenge,
          salt: chal.salt,
          signature: chal.signature || null,
          number: result.number,
          took: result.took,
        }),
      );
    }
    async generate() {
      let chal = await this.getChallenge(),
        sol = await this.solve(chal);
      return "alt:" + Altcha.makePayload(chal, sol);
    }
  }

  const PackTextures = {
    hats: {
      7: "https://i.imgur.com/vAOzlyY.png",
      12: "https://i.imgur.com/VSUId2s.png",
      13: "https://i.imgur.com/EwkbsHN.png",
      11: "https://i.imgur.com/yfqME8H.png",
      "11_p": "https://i.imgur.com/yfqME8H.png",
      "11_top": "https://i.imgur.com/s7Cxc9y.png",
      9: "https://i.imgur.com/1nY34aL.png",
      18: "https://i.imgur.com/in5H6vw.png",
      40: "https://i.imgur.com/AVOqAll.png",
      6: "https://i.imgur.com/vM9Ri8g.png",
      20: "https://i.imgur.com/f5uhWCk.png",
      23: "https://i.imgur.com/B9AcmcN.png",
      15: "https://i.imgur.com/YRQ8Ybq.png",
      8: "https://i.imgur.com/WHJch5H.png",
      31: "https://i.imgur.com/JPMqgSc.png",
    },
    accessories: {
      21: "https://i.imgur.com/4ddZert.png",
      18: "https://i.imgur.com/0rmN7L9.png",
      19: "https://i.imgur.com/Qyxy7IB.png",
    },
    weapons: {
      samurai_1_g: "https://i.imgur.com/h3nF00S.png",
      samurai_1_d: "https://i.imgur.com/xxvYtUT.png",
      samurai_1_r: "https://i.imgur.com/1G64fMe.png",

      sword_1_g: "https://i.imgur.com/urXBRpw.png",
      sword_1_d: "https://i.imgur.com/k4H1VyQ.png",
      sword_1_r: "https://i.imgur.com/V9dzAbF.png",

      spear_1_g: "https://i.imgur.com/WWfm7zT.png",
      spear_1_d: "https://i.imgur.com/5nPGXKb.png",
      spear_1_r: "https://i.imgur.com/UY7SV7j.png",

      great_axe_1_d: "https://i.imgur.com/vdTDWcn.png",
      great_axe_1_r: "https://i.imgur.com/UZ2HcQw.png",

      axe_1_d: "https://i.imgur.com/ufkQAa6.png",
      axe_1_r: "https://i.imgur.com/kr8H9g7.png",

      dagger_1_d: "https://i.imgur.com/KCufsmG.png",
      dagger_1_r: "https://i.imgur.com/CDAmjux.png",

      hammer_1_g: "https://i.imgur.com/WPWU8zC.png",
      hammer_1_d: "https://i.imgur.com/rlMQeG0.png",
      hammer_1_r: "https://i.imgur.com/oRXUfW8.png",

      great_hammer_1_g: "https://i.imgur.com/mleFosh.png",
      great_hammer_1_d: "https://i.imgur.com/yn7fqMO.png",
      great_hammer_1_r: "https://i.imgur.com/tmUzurk.png",

      bat_1_g: "https://i.imgur.com/ivLPh10.png",
      bat_1_d: "https://i.imgur.com/phXTNsa.png",
      bat_1_r: "https://i.imgur.com/6ayjbIz.png",

      stick_1_g: "https://i.imgur.com/NOaBBRd.png",
      stick_1_d: "https://i.imgur.com/H5wGqQR.png",
      stick_1_r: "https://i.imgur.com/uTDGDDy.png",

      bow_1_d: "https://i.imgur.com/qu7HHT5.png",
      bow_1_r: "https://i.imgur.com/Oneg3oF.png",

      crossbow_1_d: "https://i.imgur.com/TRqDlgX.png",
      crossbow_1_r: "https://i.imgur.com/EVesBtw.png",

      crossbow_2_d: "https://i.imgur.com/DVjCdwI.png",
      crossbow_2_r: "https://i.imgur.com/z4CyaXk.png",

      musket_1_g: "https://i.imgur.com/mAW9JAW.png",
      musket_1_d: "https://i.imgur.com/jwH99zm.png",
      musket_1_r: "https://i.imgur.com/jPE54IT.png",

      shield_1_g: "https://i.imgur.com/zYP8eVL.png",
      shield_1_d: "https://i.imgur.com/hSqLP3t.png",
      shield_1_r: "https://i.imgur.com/SNFV2dc.png",

      grab_1_g: "https://i.imgur.com/DRzBdFX.png",
      grab_1_d: "https://i.imgur.com/7kbtWfk.png",
      grab_1_r: "https://i.imgur.com/wV42LEE.png",
    },
  };

  const textureCache = new Map();

  function getTexture(id, type) {
    let url = null;
    if (type === "hat") url = PackTextures.hats[id];
    else if (type === "acc") url = PackTextures.accessories[id];
    else if (type === "weapons") url = PackTextures.weapons[id];

    if (!url) return null;
    if (textureCache.has(url)) return textureCache.get(url);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    textureCache.set(url, img);
    return img;
  }

  const originalSrcDesc = Object.getOwnPropertyDescriptor(Image.prototype, "src");

  Object.defineProperty(Image.prototype, "src", {
    get() {
      return originalSrcDesc.get.call(this);
    },
    set(value) {
      try {
        const paths = {
          "/hats/": { type: "hat", prefix: "hat_" },
          "/accessories/": { type: "acc", prefix: "access_" },
          "/weapons/": { type: "weapons", prefix: "/weapons/" },
        };

        for (const [path, { type, prefix }] of Object.entries(paths)) {
          if (value.includes(path)) {
            let id = value.split(prefix)[1]?.replace(".png", "");
            if (type === "hat" && id.includes("_"))
              id = id.split("_")[0] + "_" + id.split("_")[1];

            const replacement = getTexture(id, type);
            if (replacement) {
              value = replacement.src;
            }
            break;
          }
        }
      } catch (e) {
        console.warn("Texture pack error:", e);
      }

      return originalSrcDesc.set.call(this, value);
    },
    configurable: true,
  });

  function preloadTextures() {
    Object.keys(PackTextures.hats).forEach((id) => getTexture(id, "hat"));
    Object.keys(PackTextures.accessories).forEach((id) => getTexture(id, "acc"));
    Object.keys(PackTextures.weapons).forEach((id) => getTexture(id, "weapons"));
  }

  preloadTextures();

  const altcha = new Altcha(),
    createSocket = async (href) => {
      let url = href;
      if (/moomoo/.test(href)) {
        let token = await altcha.generate();
        url = new URL(href).origin + "/?token=" + token;
      }
      let ws = new WebSocket(url);
      return ((ws.binaryType = "arraybuffer"), ws);
    },
    createSocket_default = createSocket;

  const Hooker = new (class {
    createRecursiveHook(target, prop, callback) {
      let newValue = target[prop];
      (function recursiveHook() {
        Object.defineProperty(target, prop, {
          set(value) {
            if (
              (delete target[prop],
                (this[prop] = value),
                (newValue = value),
                callback(this, value))
            ) {
              return;
            }
            recursiveHook();
          },
          get() {
            return newValue;
          },
          configurable: !0,
        });
      })();
    }
    createHook(target, prop, callback) {
      let symbol = Symbol(prop);
      Object.defineProperty(target, prop, {
        get() {
          return this[symbol];
        },
        set(value) {
          callback(this, value, symbol);
        },
        configurable: !0,
      });
    }
    linker(value) {
      let hook = [value];
      return ((hook.valueOf = () => hook[0]), hook);
    }
  })(),
    blockProperty = (target, key) => {
      let value = target[key];
      Object.defineProperty(target, key, {
        set() { },
        get() {
          return value;
        },
        configurable: !0,
      });
    },
    Hooker_default = Hooker;

  const Config = {
    maxScreenWidth: 1920,
    maxScreenHeight: 1080,
    serverUpdateRate: 9,
    collisionDepth: 6,
    minimapRate: 3e3,
    colGrid: 10,
    clientSendRate: 5,
    barWidth: 50,
    barHeight: 17,
    barPad: 4.5,
    iconPadding: 15,
    iconPad: 0.9,
    deathFadeout: 3e3,
    crownIconScale: 60,
    crownPad: 35,
    chatCountdown: 3e3,
    chatCooldown: 500,
    maxAge: 100,
    gatherAngle: Math.PI / 2.6,
    gatherWiggle: 10,
    hitReturnRatio: 0.25,
    hitAngle: Math.PI / 2,
    playerScale: 35,
    playerSpeed: 0.0016,
    playerDecel: 0.993,
    nameY: 34,
    animalCount: 7,
    aiTurnRandom: 0.06,
    shieldAngle: Math.PI / 3,
    resourceTypes: ["wood", "food", "stone", "points"],
    areaCount: 7,
    treesPerArea: 9,
    bushesPerArea: 3,
    totalRocks: 32,
    goldOres: 7,
    riverWidth: 724,
    riverPadding: 114,
    waterCurrent: 0.0011,
    waveSpeed: 1e-4,
    waveMax: 1.3,
    treeScales: [150, 160, 165, 175],
    bushScales: [80, 85, 95],
    rockScales: [80, 85, 90],
    snowBiomeTop: 2400,
    desertBiomeTop: 2400,
    snowSpeed: 0.75,
    maxNameLength: 15,
    mapScale: 14400,
    mapPingScale: 40,
    mapPingTime: 2200,
    skinColors: [
      "#bf8f54",
      "#cbb091",
      "#896c4b",
      "#fadadc",
      "#ececec",
      "#c37373",
      "#4c4c4c",
      "#ecaff7",
      "#738cc3",
      "#8bc373",
      "#6f78c9",
    ],
  },
    Config_default = Config;

  const WeaponTypeString = ["primary", "secondary"];

  const Weapons = [
    {
      id: 0,
      itemType: 0,
      upgradeType: 0,
      type: 0,
      age: 0,
      name: "tool hammer",
      description: "tool for gathering all resources",
      src: "hammer_1",
      length: 140,
      width: 140,
      xOffset: -3,
      yOffset: 18,
      spdMult: 1,
      damage: 25,
      range: 65,
      gather: 1,
      speed: 300,
      knockback: 60,
    },
    {
      id: 1,
      itemType: 0,
      upgradeType: 1,
      type: 0,
      age: 2,
      name: "hand axe",
      description: "gathers resources at a higher rate",
      src: "axe_1",
      length: 140,
      width: 140,
      xOffset: 3,
      yOffset: 24,
      damage: 30,
      spdMult: 1,
      range: 70,
      gather: 2,
      speed: 400,
      knockback: 60,
    },
    {
      id: 2,
      itemType: 0,
      upgradeOf: 1,
      upgradeType: 1,
      type: 0,
      age: 8,
      pre: 1,
      name: "great axe",
      description: "deal more damage and gather more resources",
      src: "great_axe_1",
      length: 140,
      width: 140,
      xOffset: -8,
      yOffset: 25,
      damage: 35,
      spdMult: 1,
      range: 75,
      gather: 4,
      speed: 400,
      knockback: 60,
    },
    {
      id: 3,
      itemType: 0,
      upgradeType: 2,
      type: 0,
      age: 2,
      name: "short sword",
      description: "increased attack power but slower move speed",
      src: "sword_1",
      iPad: 1.3,
      length: 130,
      width: 210,
      xOffset: -8,
      yOffset: 46,
      damage: 35,
      spdMult: 0.85,
      range: 110,
      gather: 1,
      speed: 300,
      knockback: 60,
    },
    {
      id: 4,
      itemType: 0,
      upgradeOf: 3,
      upgradeType: 2,
      type: 0,
      age: 8,
      pre: 3,
      name: "katana",
      description: "greater range and damage",
      src: "samurai_1",
      iPad: 1.3,
      length: 130,
      width: 210,
      xOffset: -8,
      yOffset: 59,
      damage: 40,
      spdMult: 0.8,
      range: 118,
      gather: 1,
      speed: 300,
      knockback: 60,
    },
    {
      id: 5,
      itemType: 0,
      upgradeType: 3,
      isUpgrade: !1,
      type: 0,
      age: 2,
      name: "polearm",
      description: "long range melee weapon",
      src: "spear_1",
      iPad: 1.3,
      length: 130,
      width: 210,
      xOffset: -8,
      yOffset: 53,
      damage: 45,
      knock: 0.2,
      spdMult: 0.82,
      range: 142,
      gather: 1,
      speed: 700,
      knockback: 100,
    },
    {
      id: 6,
      itemType: 0,
      upgradeType: 4,
      isUpgrade: !1,
      type: 0,
      age: 2,
      name: "bat",
      description: "fast long range melee weapon",
      src: "bat_1",
      iPad: 1.3,
      length: 110,
      width: 180,
      xOffset: -8,
      yOffset: 53,
      damage: 20,
      knock: 0.7,
      spdMult: 1,
      range: 110,
      gather: 1,
      speed: 300,
      knockback: 204,
    },
    {
      id: 7,
      itemType: 0,
      upgradeType: 5,
      isUpgrade: !1,
      type: 0,
      age: 2,
      name: "daggers",
      description: "really fast short range weapon",
      src: "dagger_1",
      iPad: 0.8,
      length: 110,
      width: 110,
      xOffset: 18,
      yOffset: 0,
      damage: 20,
      knock: 0.1,
      range: 65,
      gather: 1,
      hitSlow: 0.1,
      spdMult: 1.13,
      speed: 100,
      knockback: 80,
    },
    {
      id: 8,
      itemType: 0,
      upgradeType: 6,
      isUpgrade: !1,
      type: 0,
      age: 2,
      name: "stick",
      description: "great for gathering but very weak",
      src: "stick_1",
      length: 140,
      width: 140,
      xOffset: 3,
      yOffset: 24,
      damage: 1,
      spdMult: 1,
      range: 70,
      gather: 7,
      speed: 400,
      knockback: 60,
    },
    {
      id: 9,
      itemType: 1,
      upgradeType: 7,
      projectile: 0,
      type: 1,
      age: 6,
      name: "hunting bow",
      description: "bow used for ranged combat and hunting",
      src: "bow_1",
      cost: {
        food: 0,
        wood: 4,
        stone: 0,
        gold: 0,
      },
      length: 120,
      width: 120,
      xOffset: -6,
      yOffset: 0,
      spdMult: 0.75,
      speed: 600,
      range: 1e3,
      knockback: 60,
    },
    {
      id: 10,
      itemType: 1,
      upgradeType: 8,
      isUpgrade: !1,
      type: 1,
      age: 6,
      name: "great hammer",
      description: "hammer used for destroying structures",
      src: "great_hammer_1",
      length: 140,
      width: 140,
      xOffset: -9,
      yOffset: 25,
      damage: 10,
      spdMult: 0.88,
      range: 75,
      sDmg: 7.5,
      gather: 1,
      speed: 400,
      knockback: 60,
    },
    {
      id: 11,
      itemType: 1,
      upgradeType: 9,
      isUpgrade: !1,
      type: 1,
      age: 6,
      name: "wooden shield",
      description: "blocks projectiles and reduces melee damage",
      src: "shield_1",
      length: 120,
      width: 120,
      shield: 0.2,
      xOffset: 6,
      yOffset: 0,
      spdMult: 0.7,
      speed: 1,
      range: 0,
      knockback: 0,
    },
    {
      id: 12,
      itemType: 1,
      upgradeType: 7,
      projectile: 2,
      upgradeOf: 9,
      type: 1,
      age: 8,
      pre: 9,
      name: "crossbow",
      description: "deals more damage and has greater range",
      src: "crossbow_1",
      cost: {
        food: 0,
        wood: 5,
        stone: 0,
        gold: 0,
      },
      aboveHand: !0,
      armS: 0.75,
      length: 120,
      width: 120,
      xOffset: -4,
      yOffset: 0,
      spdMult: 0.7,
      speed: 700,
      range: 1200,
      knockback: 60,
    },
    {
      id: 13,
      itemType: 1,
      upgradeType: 7,
      projectile: 3,
      upgradeOf: 12,
      type: 1,
      age: 9,
      pre: 12,
      name: "repeater crossbow",
      description: "high firerate crossbow with reduced damage",
      src: "crossbow_2",
      cost: {
        food: 0,
        wood: 10,
        stone: 0,
        gold: 0,
      },
      aboveHand: !0,
      armS: 0.75,
      length: 120,
      width: 120,
      xOffset: -4,
      yOffset: 0,
      spdMult: 0.7,
      speed: 230,
      range: 1200,
      knockback: 60,
    },
    {
      id: 14,
      itemType: 1,
      upgradeType: 10,
      isUpgrade: !1,
      type: 1,
      age: 6,
      name: "mc grabby",
      description: "steals resources from enemies",
      src: "grab_1",
      length: 130,
      width: 210,
      xOffset: -8,
      yOffset: 53,
      damage: 0,
      steal: 250,
      knock: 0.2,
      spdMult: 1.05,
      range: 125,
      gather: 0,
      speed: 700,
      knockback: 100,
    },
    {
      id: 15,
      itemType: 1,
      upgradeType: 7,
      projectile: 5,
      upgradeOf: 12,
      type: 1,
      age: 9,
      pre: 12,
      name: "musket",
      description: "slow firerate but high damage and range",
      src: "musket_1",
      cost: {
        food: 0,
        wood: 0,
        stone: 10,
        gold: 0,
      },
      aboveHand: !0,
      rec: 0.35,
      armS: 0.6,
      hndS: 0.3,
      hndD: 1.6,
      length: 205,
      width: 205,
      xOffset: 25,
      yOffset: 0,
      hideProjectile: !0,
      spdMult: 0.6,
      speed: 1500,
      range: 1400,
      knockback: 60,
    },
  ],
    ItemGroups = {
      1: {
        name: "Wall",
        limit: 30,
        layer: 0,
      },
      2: {
        name: "Spike",
        limit: 15,
        layer: 0,
      },
      3: {
        name: "Windmill",
        limit: 7,
        sandboxLimit: 299,
        layer: 1,
      },
      4: {
        name: "Mine",
        limit: 1,
        layer: 0,
      },
      5: {
        name: "Trap",
        limit: 6,
        layer: -1,
      },
      6: {
        name: "Boost",
        limit: 12,
        sandboxLimit: 299,
        layer: -1,
      },
      7: {
        name: "Turret",
        limit: 2,
        layer: 1,
      },
      8: {
        name: "Plaftorm",
        limit: 12,
        layer: -1,
      },
      9: {
        name: "Healing pad",
        limit: 4,
        layer: -1,
      },
      10: {
        name: "Spawn",
        limit: 1,
        layer: -1,
      },
      11: {
        name: "Sapling",
        limit: 2,
        layer: 0,
      },
      12: {
        name: "Blocker",
        limit: 3,
        layer: -1,
      },
      13: {
        name: "Teleporter",
        limit: 2,
        sandboxLimit: 299,
        layer: -1,
      },
    },
    Items = [
      {
        id: 0,
        itemType: 2,
        name: "apple",
        description: "restores 20 health when consumed",
        age: 0,
        cost: {
          food: 10,
          wood: 0,
          stone: 0,
          gold: 0,
        },
        restore: 20,
        scale: 22,
        holdOffset: 15,
      },
      {
        id: 1,
        itemType: 2,
        upgradeOf: 0,
        name: "cookie",
        description: "restores 40 health when consumed",
        age: 3,
        cost: {
          food: 15,
          wood: 0,
          stone: 0,
          gold: 0,
        },
        restore: 40,
        scale: 27,
        holdOffset: 15,
      },
      {
        id: 2,
        itemType: 2,
        upgradeOf: 1,
        name: "cheese",
        description: "restores 30 health and another 50 over 5 seconds",
        age: 7,
        cost: {
          food: 25,
          wood: 0,
          stone: 0,
          gold: 0,
        },
        restore: 30,
        scale: 27,
        holdOffset: 15,
      },
      {
        id: 3,
        itemType: 3,
        itemGroup: 1,
        name: "wood wall",
        description: "provides protection for your village",
        age: 0,
        cost: {
          food: 0,
          wood: 10,
          stone: 0,
          gold: 0,
        },
        projDmg: !0,
        health: 380,
        scale: 50,
        holdOffset: 20,
        placeOffset: -5,
      },
      {
        id: 4,
        itemType: 3,
        itemGroup: 1,
        upgradeOf: 3,
        name: "stone wall",
        description: "provides improved protection for your village",
        age: 3,
        cost: {
          food: 0,
          wood: 0,
          stone: 25,
          gold: 0,
        },
        health: 900,
        scale: 50,
        holdOffset: 20,
        placeOffset: -5,
      },
      {
        pre: 1,
        id: 5,
        itemType: 3,
        itemGroup: 1,
        upgradeOf: 4,
        name: "castle wall",
        description: "provides powerful protection for your village",
        age: 7,
        cost: {
          food: 0,
          wood: 0,
          stone: 35,
          gold: 0,
        },
        health: 1500,
        scale: 52,
        holdOffset: 20,
        placeOffset: -5,
      },
      {
        id: 6,
        itemType: 4,
        itemGroup: 2,
        name: "spikes",
        description: "damages enemies when they touch them",
        age: 0,
        cost: {
          food: 0,
          wood: 20,
          stone: 5,
          gold: 0,
        },
        health: 400,
        damage: 20,
        scale: 49,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5,
      },
      {
        id: 7,
        itemType: 4,
        itemGroup: 2,
        upgradeOf: 6,
        name: "greater spikes",
        description: "damages enemies when they touch them",
        age: 5,
        cost: {
          food: 0,
          wood: 30,
          stone: 10,
          gold: 0,
        },
        health: 500,
        damage: 35,
        scale: 52,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5,
      },
      {
        id: 8,
        itemType: 4,
        itemGroup: 2,
        upgradeOf: 7,
        name: "poison spikes",
        description: "poisons enemies when they touch them",
        age: 9,
        pre: 1,
        cost: {
          food: 0,
          wood: 35,
          stone: 15,
          gold: 0,
        },
        health: 600,
        damage: 30,
        poisonDamage: 5,
        scale: 52,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5,
      },
      {
        id: 9,
        itemType: 4,
        itemGroup: 2,
        upgradeOf: 7,
        name: "spinning spikes",
        description: "damages enemies when they touch them",
        age: 9,
        pre: 2,
        cost: {
          food: 0,
          wood: 30,
          stone: 20,
          gold: 0,
        },
        health: 500,
        damage: 45,
        turnSpeed: 0.003,
        scale: 52,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5,
      },
      {
        id: 10,
        itemType: 5,
        itemGroup: 3,
        name: "windmill",
        description: "generates gold over time",
        age: 0,
        cost: {
          food: 0,
          wood: 50,
          stone: 10,
          gold: 0,
        },
        health: 400,
        pps: 1,
        turnSpeed: 0.0016,
        spritePadding: 25,
        iconLineMult: 12,
        scale: 45,
        holdOffset: 20,
        placeOffset: 5,
      },
      {
        id: 11,
        itemType: 5,
        itemGroup: 3,
        upgradeOf: 10,
        name: "faster windmill",
        description: "generates more gold over time",
        age: 5,
        pre: 1,
        cost: {
          food: 0,
          wood: 60,
          stone: 20,
          gold: 0,
        },
        health: 500,
        pps: 1.5,
        turnSpeed: 0.0025,
        spritePadding: 25,
        iconLineMult: 12,
        scale: 47,
        holdOffset: 20,
        placeOffset: 5,
      },
      {
        id: 12,
        itemType: 5,
        itemGroup: 3,
        upgradeOf: 11,
        name: "power mill",
        description: "generates more gold over time",
        age: 8,
        pre: 1,
        cost: {
          food: 0,
          wood: 100,
          stone: 50,
          gold: 0,
        },
        health: 800,
        pps: 2,
        turnSpeed: 0.005,
        spritePadding: 25,
        iconLineMult: 12,
        scale: 47,
        holdOffset: 20,
        placeOffset: 5,
      },
      {
        id: 13,
        itemType: 6,
        itemGroup: 4,
        name: "mine",
        description: "allows you to mine stone",
        age: 5,
        type: 2,
        cost: {
          food: 0,
          wood: 20,
          stone: 100,
          gold: 0,
        },
        iconLineMult: 12,
        scale: 65,
        holdOffset: 20,
        placeOffset: 0,
      },
      {
        id: 14,
        itemType: 6,
        itemGroup: 11,
        name: "sapling",
        description: "allows you to farm wood",
        age: 5,
        type: 0,
        cost: {
          food: 0,
          wood: 150,
          stone: 0,
          gold: 0,
        },
        iconLineMult: 12,
        colDiv: 0.5,
        scale: 110,
        holdOffset: 50,
        placeOffset: -15,
      },
      {
        id: 15,
        itemType: 7,
        itemGroup: 5,
        name: "pit trap",
        description: "pit that traps enemies if they walk over it",
        age: 4,
        cost: {
          food: 0,
          wood: 30,
          stone: 30,
          gold: 0,
        },
        trap: !0,
        ignoreCollision: !0,
        hideFromEnemy: !0,
        health: 500,
        colDiv: 0.2,
        scale: 50,
        holdOffset: 20,
        placeOffset: -5,
      },
      {
        id: 16,
        itemType: 7,
        itemGroup: 6,
        name: "boost pad",
        description: "provides boost when stepped on",
        age: 4,
        cost: {
          food: 0,
          wood: 5,
          stone: 20,
          gold: 0,
        },
        boostSpeed: 1.5,
        health: 150,
        colDiv: 0.7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5,
      },
      {
        id: 17,
        itemType: 8,
        itemGroup: 7,
        name: "turret",
        description: "defensive structure that shoots at enemies",
        age: 7,
        doUpdate: !0,
        cost: {
          food: 0,
          wood: 200,
          stone: 150,
          gold: 0,
        },
        health: 800,
        projectile: 1,
        shootRange: 700,
        shootRate: 2200,
        scale: 43,
        holdOffset: 20,
        placeOffset: -5,
      },
      {
        id: 18,
        itemType: 8,
        itemGroup: 8,
        name: "platform",
        description: "platform to shoot over walls and cross over water",
        age: 7,
        cost: {
          food: 0,
          wood: 20,
          stone: 0,
          gold: 0,
        },
        ignoreCollision: !0,
        zIndex: 1,
        health: 300,
        scale: 43,
        holdOffset: 20,
        placeOffset: -5,
      },
      {
        id: 19,
        itemType: 8,
        itemGroup: 9,
        name: "healing pad",
        description: "standing on it will slowly heal you",
        age: 7,
        cost: {
          food: 10,
          wood: 30,
          stone: 0,
          gold: 0,
        },
        ignoreCollision: !0,
        healCol: 15,
        health: 400,
        colDiv: 0.7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5,
      },
      {
        id: 20,
        itemType: 9,
        itemGroup: 10,
        name: "spawn pad",
        description: "you will spawn here when you die but it will dissapear",
        age: 9,
        cost: {
          food: 0,
          wood: 100,
          stone: 100,
          gold: 0,
        },
        health: 400,
        ignoreCollision: !0,
        spawnPoint: !0,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5,
      },
      {
        id: 21,
        itemType: 8,
        itemGroup: 12,
        name: "blocker",
        description: "blocks building in radius",
        age: 7,
        cost: {
          food: 0,
          wood: 30,
          stone: 25,
          gold: 0,
        },
        ignoreCollision: !0,
        blocker: 300,
        health: 400,
        colDiv: 0.7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5,
      },
      {
        id: 22,
        itemType: 8,
        itemGroup: 13,
        name: "teleporter",
        description: "teleports you to a random point on the map",
        age: 7,
        cost: {
          food: 0,
          wood: 60,
          stone: 60,
          gold: 0,
        },
        teleport: !0,
        health: 200,
        colDiv: 0.7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5,
      },
    ],
    WeaponVariants = [
      {
        id: 0,
        src: "",
        xp: 1,
        needXP: 0,
        val: 1,
        color: "#7e7e90",
      },
      {
        id: 1,
        src: "_g",
        xp: 3e3,
        needXP: 3e3,
        val: 1.1,
        color: "#f7cf45",
      },
      {
        id: 2,
        src: "_d",
        xp: 7e3,
        needXP: 4e3,
        val: 1.18,
        color: "#6d91cb",
      },
      {
        id: 3,
        src: "_r",
        poison: !0,
        xp: 12e3,
        needXP: 5e3,
        val: 1.18,
        color: "#be5454",
      },
    ],
    Projectiles = [
      {
        id: 0,
        name: "Hunting bow",
        index: 0,
        layer: 0,
        src: "arrow_1",
        damage: 25,
        scale: 103,
        range: 1e3,
        speed: 1.6,
      },
      {
        id: 1,
        name: "Turret",
        index: 1,
        layer: 1,
        damage: 25,
        scale: 20,
        speed: 1.5,
        range: 700,
      },
      {
        id: 2,
        name: "Crossbow",
        index: 0,
        layer: 0,
        src: "arrow_1",
        damage: 35,
        scale: 103,
        range: 1200,
        speed: 2.5,
      },
      {
        id: 3,
        name: "Repeater crossbow",
        index: 0,
        layer: 0,
        src: "arrow_1",
        damage: 30,
        scale: 103,
        range: 1200,
        speed: 2,
      },
      {
        id: 4,
        index: 1,
        layer: 1,
        damage: 16,
        scale: 20,
        range: 0,
        speed: 0,
      },
      {
        id: 5,
        name: "Musket",
        index: 0,
        layer: 0,
        src: "bullet_1",
        damage: 50,
        scale: 160,
        range: 1400,
        speed: 3.6,
      },
    ];

  class Vector {
    x;
    y;
    constructor(x = 0, y = 0) {
      ((this.x = x), (this.y = y));
    }
    static fromAngle(angle, length = 1) {
      return new Vector(Math.cos(angle) * length, Math.sin(angle) * length);
    }
    add(vec) {
      if (vec instanceof Vector) {
        ((this.x += vec.x), (this.y += vec.y));
      } else {
        ((this.x += vec), (this.y += vec));
      }
      return this;
    }
    sub(vec) {
      if (vec instanceof Vector) {
        ((this.x -= vec.x), (this.y -= vec.y));
      } else {
        ((this.x -= vec), (this.y -= vec));
      }
      return this;
    }
    mult(scalar) {
      return ((this.x *= scalar), (this.y *= scalar), this);
    }
    div(scalar) {
      let inv = 1 / scalar;
      return ((this.x *= inv), (this.y *= inv), this);
    }
    get length() {
      return Math.hypot(this.x, this.y);
    }
    normalizeVec() {
      let len = this.length;
      if (len > 0) {
        let inv = 1 / len;
        ((this.x *= inv), (this.y *= inv));
      }
      return this;
    }
    dot(vec) {
      return this.x * vec.x + this.y * vec.y;
    }
    setXY(x, y) {
      return ((this.x = x), (this.y = y), this);
    }
    setVec(vec) {
      return this.setXY(vec.x, vec.y);
    }
    setLength(value) {
      return this.normalizeVec().mult(value);
    }
    copy() {
      return new Vector(this.x, this.y);
    }
    distanceDefault(vec) {
      let dx = this.x - vec.x,
        dy = this.y - vec.y;
      return dx * dx + dy * dy;
    }
    distance(vec) {
      let dx = this.x - vec.x,
        dy = this.y - vec.y;
      return Math.hypot(dx, dy);
    }
    angle(vec) {
      return Math.atan2(vec.y - this.y, vec.x - this.x);
    }
    addDirection(angle, length) {
      let x = this.x + Math.cos(angle) * length,
        y = this.y + Math.sin(angle) * length;
      return new Vector(x, y);
    }
    isEqual(vec) {
      return this.x === vec.x && this.y === vec.y;
    }
    makeString() {
      return this.x + ":" + this.y;
    }
  }

  const Vector_default = Vector;

  const getAngle = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1);

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max),
    fixTo = (value, fraction) => parseFloat(value.toFixed(fraction)),
    PI = Math.PI,
    PI2 = PI * 2,
    getAngleDist = (a, b) => {
      let p = Math.abs(b - a) % (PI * 2);
      return p > PI ? PI * 2 - p : p;
    },
    findMiddleAngle = (a, b) => {
      let x = Math.cos(a) + Math.cos(b),
        y = Math.sin(a) + Math.sin(b);
      return Math.atan2(y, x);
    },
    toRadians = (degrees) => degrees * (PI / 180),
    removeFast = (array, index) => {
      if (index < 0 || index >= array.length) {
        throw RangeError("removeFast: Index out of range");
      }
      if (index === array.length - 1) {
        array.pop();
      } else {
        array[index] = array.pop();
      }
    };

  const lerp = (start, end, factor) => (1 - factor) * start + factor * end;

  const reverseAngle = (angle) =>
    Math.atan2(-Math.sin(angle), -Math.cos(angle)),
    getTargetValue = (target, prop) => target[prop],
    setTargetValue = (target, prop, value) => {
      target[prop] = value;
    },
    formatDate = (date) => {
      if (date == null) {
        date = new Date();
      }
      let hours = (date.getHours() + "").padStart(2, "0"),
        minutes = (date.getMinutes() + "").padStart(2, "0"),
        seconds = (date.getSeconds() + "").padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    },
    incrementor = () => {
      let value = 0;
      return function () {
        return value++;
      };
    },
    getUniqueID = incrementor(),
    pointInsideRect = (point, rectStart, rectEnd) =>
      point.x >= rectStart.x &&
      point.x <= rectEnd.x &&
      point.y >= rectStart.y &&
      point.y <= rectEnd.y;

  const isActiveInput = () => {
    let active = document.activeElement || document.body;
    return (
      active instanceof HTMLInputElement ||
      active instanceof HTMLTextAreaElement
    );
  },
    ReducedMovementSimulator = class {
      constructor(entity, near = null) {
        let current = entity.pos?.current || entity.pos?.future || entity;
        this.x = current.x;
        this.y = current.y;
        this.scale = entity.scale || 35;
        this.slowMult = entity.slowMult || 1;
        this.xVel = typeof entity.xVel === "number" ? entity.xVel : 0;
        this.yVel = typeof entity.yVel === "number" ? entity.yVel : 0;
        this.moveDir = entity.move_dir ?? entity.dir ?? null;
        this.weaponID = entity.weapon?.current ?? entity.weapon ?? entity.weaponIndex ?? 0;
        this.hatID = entity.hatID ?? entity.skinID ?? entity.skinIndex ?? 0;
        this.tailID = entity.tailID ?? entity.tailIndex ?? 0;
        this.near = near;
      }
      continueTick(delta = 16.66, moveDir = this.moveDir, firstTick = !1) {
        if (!firstTick && this.slowMult < 1) {
          this.slowMult = Math.min(1, this.slowMult + 0.0008 * delta);
        }
        let weapon = DataHandler_default.getWeapon(this.weaponID) || {},
          hat = Hats[this.hatID] || {},
          tail = Accessories[this.tailID] || {},
          snowMult = this.y <= 2400 ? (hat.coldM ? 1 : 0.75) : 1,
          speedMult =
            (weapon.spdMult || 1) *
            (hat.spdMult || 1) *
            (tail.spdMult || 1) *
            snowMult *
            this.slowMult;
        if (this.y >= 14400 / 2 - 724 / 2 && this.y <= 14400 / 2 + 724 / 2) {
          if (hat.watrImm) {
            speedMult *= 0.75;
            this.xVel += 0.0011 * 0.4 * delta;
          } else {
            speedMult *= 0.33;
            this.xVel += 0.0011 * delta;
          }
        }
        let vx = moveDir != null ? Math.cos(moveDir) : 0,
          vy = moveDir != null ? Math.sin(moveDir) : 0,
          len = Math.hypot(vx, vy) || 1;
        vx /= len;
        vy /= len;
        this.xVel += vx * 0.0016 * speedMult * delta;
        this.yVel += vy * 0.0016 * speedMult * delta;
        this.x += this.xVel * delta;
        this.y += this.yVel * delta;
        this.xVel *= 0.993;
        this.yVel *= 0.993;
        return { x: this.x, y: this.y, xVel: this.xVel, yVel: this.yVel };
      }
      static predict(entity, ticks = 1, delta = 16.66, near = null, moveDir = entity.move_dir ?? entity.dir ?? null) {
        let sim = new ReducedMovementSimulator(entity, near);
        for (let i = 0; i < ticks; i++) {
          sim.continueTick(delta, moveDir, i === 0);
        }
        return { x: sim.x, y: sim.y, xVel: sim.xVel, yVel: sim.yVel };
      }
    },
    SharedPathPlanner = class {
      static isBlocked(client2, point, selfScale = 35) {
        let blocked = !1;
        client2.ObjectManager.grid2D.query(point.x, point.y, 2, (id) => {
          let object = client2.ObjectManager.objects.get(id);
          if (!object || !(object instanceof PlayerObject || object instanceof Resource)) {
            return;
          }
          let isFriendlyTrap = object instanceof PlayerObject && object.type === 15 && !client2.PlayerManager.isEnemyByID(object.ownerID, client2.myPlayer);
          if (isFriendlyTrap) {
            return;
          }
          let scale = (object.collisionScale || object.scale || 0) + selfScale;
          if (point.distance(object.pos.current) <= scale) {
            blocked = !0;
          }
        });
        return blocked;
      }
      static getPathAngle(client2, origin, target, selfScale = 35) {
        let direct = origin.angle(target),
          distance = origin.distance(target),
          step = Math.min(140, Math.max(70, distance)),
          offsets = [0, Math.PI / 10, -Math.PI / 10, Math.PI / 5, -Math.PI / 5, Math.PI / 3, -Math.PI / 3],
          bestAngle = direct,
          bestScore = -Infinity;
        for (let offset of offsets) {
          let angle = direct + offset,
            point = origin.addDirection(angle, step),
            blocked = this.isBlocked(client2, point, selfScale),
            score = -point.distance(target) - Math.abs(offset) * 20;
          if (blocked) {
            score -= 1e4;
          }
          if (score > bestScore) {
            bestScore = score;
            bestAngle = angle;
          }
        }
        return bestAngle;
      }
    },
    getAngleFromBitmask = (bitmask, rotate) => {
      let vec = {
        x: 0,
        y: 0,
      };
      if (bitmask & 1) {
        vec.y--;
      }
      if (bitmask & 2) {
        vec.y++;
      }
      if (bitmask & 4) {
        vec.x--;
      }
      if (bitmask & 8) {
        vec.x++;
      }
      if (rotate) {
        ((vec.x *= -1), (vec.y *= -1));
      }
      return vec.x === 0 && vec.y === 0 ? null : Math.atan2(vec.y, vec.x);
    },
    formatCode = (code) => {
      if (((code += ""), code === "Backspace")) {
        return code;
      }
      if (code === "Escape") {
        return "ESC";
      }
      if (code === "Delete") {
        return "DEL";
      }
      if (code === "Minus") {
        return "-";
      }
      if (code === "Equal") {
        return "=";
      }
      if (code === "BracketLeft") {
        return "[";
      }
      if (code === "BracketRight") {
        return "]";
      }
      if (code === "Slash") {
        return "/";
      }
      if (code === "Backslash") {
        return "\\";
      }
      if (code === "Quote") {
        return "'";
      }
      if (code === "Backquote") {
        return "`";
      }
      if (code === "Semicolon") {
        return ";";
      }
      if (code === "Comma") {
        return ",";
      }
      if (code === "Period") {
        return ".";
      }
      if (code === "CapsLock") {
        return "CAPS";
      }
      if (code === "ContextMenu") {
        return "CTXMENU";
      }
      if (code === "NumLock") {
        return "LOCK";
      }
      return code
        .replace(/^Page/, "PG")
        .replace(/^Digit/, "")
        .replace(/Button$/, "BTN")
        .replace(/^Key/, "")
        .replace(/^(Shift|Control|Alt)(L|R).*$/, "$2$1")
        .replace(/Control/, "CTRL")
        .replace(/^Arrow/, "")
        .replace(/^Numpad/, "NUM")
        .replace(/Decimal/, "DEC")
        .replace(/Subtract/, "SUB")
        .replace(/Divide/, "DIV")
        .replace(/Multiply/, "MULT")
        .toUpperCase();
    },
    formatButton = (button) => {
      if (button === 0) {
        return "LBTN";
      }
      if (button === 1) {
        return "MBTN";
      }
      if (button === 2) {
        return "RBTN";
      }
      if (button === 3) {
        return "BBTN";
      }
      if (button === 4) {
        return "FBTN";
      }
      throw Error(`formatButton Error: "${button}" is not valid button`);
    },
    removeClass = (target, name) => {
      if (target instanceof HTMLElement) {
        target.classList.remove(name);
        return;
      }
      for (let element of target) {
        element.classList.remove(name);
      }
    };

  const pointInRiver = (position) => {
    let y = position.y,
      below =
        y >= Config_default.mapScale / 2 - Config_default.riverWidth / 2,
      above =
        y <= Config_default.mapScale / 2 + Config_default.riverWidth / 2;
    return below && above;
  },
    pointInDesert = (position) =>
      position.y >= Config_default.mapScale - Config_default.snowBiomeTop,
    inRange = (value, min, max) => value >= min && value <= max,
    targetInsideRect = (target, rectPos, radius) => {
      let screen = new Vector_default(1920, 1080).div(2).add(radius),
        rectStart = rectPos.copy().sub(screen),
        rectEnd = rectPos.copy().add(screen);
      return pointInsideRect(target, rectStart, rectEnd);
    },
    findPlacementAngles = (angles) => {
      let output = new Set();
      for (let i = 0; i < angles.length; i++) {
        let [angle, offset] = angles[i],
          start = angle - offset,
          end = angle + offset,
          startIntersects = !1,
          endIntersects = !1;
        for (let j = 0; j < angles.length; j++) {
          if (startIntersects && endIntersects) {
            break;
          }
          if (i === j) {
            continue;
          }
          let [angle2, offset2] = angles[j];
          if (getAngleDist(start, angle2) <= offset2) {
            startIntersects = !0;
          }
          if (getAngleDist(end, angle2) <= offset2) {
            endIntersects = !0;
          }
        }
        if (!startIntersects) {
          output.add(start);
        }
        if (!endIntersects) {
          output.add(end);
        }
      }
      return [...output];
    },
    createAction = (callback, time = 0) => {
      let state = !1,
        timeoutID = setTimeout(() => {
          if (state) {
            return;
          }
          ((state = !0), callback());
        }, time);
      return () => {
        if (state) {
          return;
        }
        ((state = !0), clearTimeout(timeoutID), callback());
      };
    };

  class CustomStorage {
    static get(key) {
      let value = window.localStorage.getItem(key);
      return value === null ? null : JSON.parse(value);
    }
    static set(key, value, stringify = !0) {
      let data = stringify ? JSON.stringify(value) : value;
      window.localStorage.setItem(key, data);
    }
    static delete(key) {
      let has =
        window.localStorage.hasOwnProperty(key) && key in window.localStorage;
      return (window.localStorage.removeItem(key), has);
    }
  }

  const Header_default =
    '<header>\n    <div id="credits">\n        <div id="logoWordmark">ATLANTIS <span style="font-size:12px;opacity:0.5;font-weight:400;">v1.5</span></div>\n    </div>\n\n    <svg\n        id="close-button"\n        class="icon"\n        xmlns="http://www.w3.org/2000/svg"\n        viewBox="0 0 30 30"\n    >\n        <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/>\n    </svg>\n</header>';

  const Navbar_default =
    '<div id="navbar-container">\n    <button data-id="0" class="open-menu active">\n        <span>\n            <svg class="small-icon" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">\n                <path fill="currentColor"\n                    d="M240 6.1c9.1-8.2 22.9-8.2 32 0l232 208c9.9 8.8 10.7 24 1.8 33.9s-24 10.7-33.9 1.8l-8-7.2v205.3c0 35.3-28.7 64-64 64h-288c-35.3 0-64-28.7-64-64V242.6l-8 7.2c-9.9 8.8-25 8-33.9-1.8s-8-25 1.8-33.9zm16 50.1L96 199.7V448c0 8.8 7.2 16 16 16h48V360c0-39.8 32.2-72 72-72h48c39.8 0 72 32.2 72 72v104h48c8.8 0 16-7.2 16-16V199.7L256 56.3zM208 464h96V360c0-13.3-10.7-24-24-24h-48c-13.3 0-24 10.7-24 24z" />\n            </svg>\n            Home\n        </span>\n    </button>\n    <button data-id="1" class="open-menu">\n        <span>\n            <svg class="small-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n                <path fill="currentColor"\n                    d="M6.21 13.29a.9.9 0 0 0-.33-.21a1 1 0 0 0-.76 0a.9.9 0 0 0-.54.54a1 1 0 1 0 1.84 0a1 1 0 0 0-.21-.33M13.5 11h1a1 1 0 0 0 0-2h-1a1 1 0 0 0 0 2m-4 0h1a1 1 0 0 0 0-2h-1a1 1 0 0 0 0 2m-3-2h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2M20 5H4a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3m1 11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1Zm-6-3H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2m3.5-4h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2m.71 4.29a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a.9.9 0 0 0-.33.21a1 1 0 0 0-.21.33a1 1 0 1 0 1.92.38a.84.84 0 0 0-.08-.38a1 1 0 0 0-.21-.33" />\n            </svg>\n            Keybinds\n        </span>\n    </button>\n    <button data-id="2" class="open-menu">\n        <span>\n            <svg class="small-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n                <path fill="currentColor"\n                    d="m19.05 21.6l-2.925-2.9l-2.2 2.2l-.7-.7q-.575-.575-.575-1.425t.575-1.425l4.225-4.225q.575-.575 1.425-.575t1.425.575l.7.7l-2.2 2.2l2.9 2.925q.3.3.3.7t-.3.7l-1.25 1.25q-.3.3-.7.3t-.7-.3M22 5.9L10.65 17.25l.125.1q.575.575.575 1.425t-.575 1.425l-.7.7l-2.2-2.2l-2.925 2.9q-.3.3-.7.3t-.7-.3L2.3 20.35q-.3-.3-.3-.7t.3-.7l2.9-2.925l-2.2-2.2l.7-.7q.575-.575 1.425-.575t1.425.575l.1.125L18 1.9h4zM6.95 10.85L2 5.9v-4h4l4.95 4.95z" />\n            </svg>\n            Combat\n        </span>\n    </button>\n    <button data-id="3" class="open-menu">\n        <span>\n            <svg class="small-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\n                    <path\n                        d="M12 5c-6.307 0-9.367 5.683-9.91 6.808a.44.44 0 0 0 0 .384C2.632 13.317 5.692 19 12 19s9.367-5.683 9.91-6.808a.44.44 0 0 0 0-.384C21.368 10.683 18.308 5 12 5" />\n                    <circle cx="12" cy="12" r="3" />\n                </g>\n            </svg>\n            Visuals\n        </span>\n    </button>\n    <button data-id="4" class="open-menu">\n        <span>\n            <svg class="small-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n                <path fill="currentColor"\n                    d="M2 18h7v2H2zm0-7h9v2H2zm0-7h20v2H2zm18.674 9.025l1.156-.391l1 1.732l-.916.805a4 4 0 0 1 0 1.658l.916.805l-1 1.732l-1.156-.391a4 4 0 0 1-1.435.83L19 21h-2l-.24-1.196a4 4 0 0 1-1.434-.83l-1.156.392l-1-1.732l.916-.805a4 4 0 0 1 0-1.658l-.916-.805l1-1.732l1.156.391c.41-.37.898-.655 1.435-.83L17 11h2l.24 1.196a4 4 0 0 1 1.434.83M18 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2" />\n            </svg>\n            Misc\n        </span>\n    </button>\n    <button data-id="5" class="open-menu">\n        <span>\n            <svg class="small-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n                <path fill="currentColor"\n                    d="M22 14h-1c0-3.87-3.13-7-7-7h-1V5.73A2 2 0 1 0 10 4c0 .74.4 1.39 1 1.73V7h-1c-3.87 0-7 3.13-7 7H2c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h1v1a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1m-1 3h-2v3H5v-3H3v-1h2v-2c0-2.76 2.24-5 5-5h4c2.76 0 5 2.24 5 5v2h2zm-3.5-1.5c0 1.11-.89 2-2 2c-.97 0-1.77-.69-1.96-1.6l2.96-2.12c.6.35 1 .98 1 1.72m-10-1.72l2.96 2.12c-.18.91-.99 1.6-1.96 1.6a2 2 0 0 1-2-2c0-.74.4-1.37 1-1.72" />\n            </svg>\n            Bots\n        </span>\n    </button>\n    <button data-id="6" class="open-menu bottom-align">\n        <span>\n            <svg class="small-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n                <path fill="currentColor"\n                    d="m19.546 7.573l-1.531-1.57l-1.442 1.291l-.959.86l3.876 3.987l-2.426 2.496l-1.451 1.492c.55.499 1.091.99 1.64 1.486l.764.694l2.21-2.277L24 12.14v-.001zM2.992 9.072L0 12.14c2.01 2.073 3.993 4.115 5.984 6.167l.51-.464l1.893-1.715L6.94 14.64l-2.43-2.5l3.109-3.196l.767-.789c-.434-.39-.86-.772-1.288-1.154L5.984 6v.001zm12.585-6.038L11.632 21.6l-.196-.039l-3.029-.595l2.555-12.02L12.353 2.4z" />\n            </svg>\n            Devtool\n        </span>\n    </button>\n    <div\n        style="margin-top: auto; padding: 15px 10px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.1);">\n        <span\n            style="color: #7d6bff; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; display: block; opacity: 0.6; margin-bottom: 2px;">Created\n            by</span>\n        <span\n            style="color: #fff; font-size: 15px; font-weight: 900; display: block; text-shadow: 0 0 8px rgba(245, 217, 81, 0.6);">Atlantis</span>\n    </div>\n</div>';

  const Home_default =
    '<div class="menu-page opened" data-id="0">\n    <div class="page-title">Home</div>\n\n    <div class="section">\n        <div class="section-title">Atlantis Control Center</div>\n        <div class="section-content">\n\n            <div class="content-option text">\n                <span class="text-value simplified">Atlantis is built for clean control and fast reactions.\n                    everything. So don\'t be surprised by the lack of numerous hotkeys - not even for switching weapons.\n                    This client is designed for simple <span class="highlight">WASD</span> movement and primarly <span\n                        class="highlight">polearm + hammer</span>, which is what makes it great. There\'s no need to\n                    remember dozens of hotkeys, chat commands, or anything else.</span>\n            </div>\n\n            <div class="content-option text">\n                <span class="text-value simplified">Focused updates are ongoing. Report bugs and balance issues.\n                    the client keep growing!</span>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n\n        <div class="section-content">\n\n            <div class="content-option left-flex text">\n                <span class="option-title">Author: </span>)</span>\n            </div>\n\n            <div class="content-option left-flex text">\n                <a href="https://discord.gg/cPRFdcZkeD" class="text-value" target="_blank">\n                    <svg class="icon link" xmlns="http://www.w3.org/2000/svg" width="24" height="24"\n                        viewBox="0 0 24 24">\n                        <path fill="currentColor"\n                            d="M19.303 5.337A17.3 17.3 0 0 0 14.963 4c-.191.329-.403.775-.552 1.125a16.6 16.6 0 0 0-4.808 0C9.454 4.775 9.23 4.329 9.05 4a17 17 0 0 0-4.342 1.337C1.961 9.391 1.218 13.35 1.59 17.255a17.7 17.7 0 0 0 5.318 2.664a13 13 0 0 0 1.136-1.836c-.627-.234-1.22-.52-1.794-.86c.149-.106.297-.223.435-.34c3.46 1.582 7.207 1.582 10.624 0c.149.117.287.234.435.34c-.573.34-1.167.626-1.793.86a13 13 0 0 0 1.135 1.836a17.6 17.6 0 0 0 5.318-2.664c.457-4.52-.722-8.448-3.1-11.918M8.52 14.846c-1.04 0-1.889-.945-1.889-2.101s.828-2.102 1.89-2.102c1.05 0 1.91.945 1.888 2.102c0 1.156-.838 2.1-1.889 2.1m6.974 0c-1.04 0-1.89-.945-1.89-2.101s.828-2.102 1.89-2.102c1.05 0 1.91.945 1.889 2.102c0 1.156-.828 2.1-1.89 2.1" />\n                    </svg>\n                </a>\n\n                <a href="https://github.com/atlantis/client" class="text-value" target="_blank">\n                    <svg class="icon link" xmlns="http://www.w3.org/2000/svg" width="24" height="24"\n                        viewBox="0 0 24 24">\n                        <path fill="currentColor"\n                            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />\n                    </svg>\n                </a>\n\n                <a href="https://greasyfork.org/en/users/919633-.3z007" class="text-value" target="_blank">\n                    <svg class="icon link" version="1.1" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">\n                        <circle cx="48" cy="48" r="48" />\n                        <clipPath id="a">\n                            <circle cx="48" cy="48" r="47" />\n                        </clipPath>\n                        <text clip-path="url(#a)" fill="#fff"\n                            font-family="\'DejaVu Sans\', Verdana, Arial, \'Liberation Sans\', sans-serif" font-size="18"\n                            letter-spacing="-.75" pointer-events="none" text-anchor="middle"\n                            style="-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none">\n                            <tspan x="51" y="13" textLength="57">= null;</tspan>\n                            <tspan x="56" y="35" textLength="98">function init</tspan>\n                            <tspan x="49" y="57" textLength="113">for (const i = 0;</tspan>\n                            <tspan x="50" y="79" textLength="105">XmlHttpReq</tspan>\n                            <tspan x="48" y="101" textLength="80">appendCh</tspan>\n                        </text>\n                        <path\n                            d="m44 29a6.364 6.364 0 0 1 0 9l36 36a3.25 3.25 0 0 1-6.5 6.5l-36-36a6.364 6.364 0 0 1-9 0l-19-19a1.7678 1.7678 0 0 1 0-2.5l13-13a1.7678 1.7678 0 0 1 2.5 0z"\n                            stroke="#000" stroke-width="4" />\n                        <path\n                            d="m44 29a6.364 6.364 0 0 1 0 9l36 36a3.25 3.25 0 0 1-6.5 6.5l-36-36a6.364 6.364 0 0 1-9 0l-19-19a1.7678 1.7678 0 0 1 2.5-2.5l14 14 4-4-14-14a1.7678 1.7678 0 0 1 2.5-2.5l14 14 4-4-14-14a1.7678 1.7678 0 0 1 2.5-2.5z"\n                            fill="#fff" />\n                    </svg>\n                </a>\n\n            </div>\n\n            <div class="content-option left-flex text">\n                <span class="option-title">Building hash: </span>\n                <span id="author" class="text-value">{HASH}</span>\n            </div>\n\n        </div>\n    </div>\n\n</div>';

  const Keybinds_default =
    '<div class="menu-page" data-id="1">\n    <div class="page-title">Keybinds</div>\n    <p class="page-description">Configure controls for items, weapons, and hats</p>\n\n    \x3c!-- Items & Weapons --\x3e\n    <div class="section">\n        <div class="section-title">Items & Weapons</div>\n        <div class="section-content split">\n\n            <div class="content-split">\n                <div class="content-option">\n                    <span class="option-title">Food</span>\n                    <button id="_food" class="hotkeyInput"></button>\n                </div>\n\n                <div class="content-option">\n                    <span class="option-title">Wall</span>\n                    <button id="_wall" class="hotkeyInput"></button>\n                </div>\n\n                <div class="content-option">\n                    <span class="option-title">Spike</span>\n                    <button id="_spike" class="hotkeyInput"></button>\n                </div>\n\n                <div class="content-option">\n                    <span class="option-title">Windmill</span>\n                    <button id="_windmill" class="hotkeyInput"></button>\n                </div>\n            </div>\n\n            <div class="content-split">\n                <div class="content-option">\n                    <span class="option-title">Farm</span>\n                    <button id="_farm" class="hotkeyInput"></button>\n                </div>\n\n                <div class="content-option">\n                    <span class="option-title">Trap</span>\n                    <button id="_trap" class="hotkeyInput"></button>\n                </div>\n\n                <div class="content-option">\n                    <span class="option-title">Turret</span>\n                    <button id="_turret" class="hotkeyInput"></button>\n                </div>\n\n                <div class="content-option">\n                    <span class="option-title">Spawn</span>\n                    <button id="_spawn" class="hotkeyInput"></button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    \x3c!-- Controls & Movement --\x3e\n    <div class="section">\n        <div class="section-title">Controls & Movement</div>\n        <div class="section-content">\n\n            <div class="content-split">\n\n                <div class="content-option">\n                    <span class="option-title">Lock bot position</span>\n                    <button id="_lockBotPosition" class="hotkeyInput"></button>\n                </div>\n\n                <div class="content-option">\n\n                </div>\n\n                <div class="content-option">\n                   \n                </div>\n\n                <div class="content-option">\n                    <span class="option-title">Toggle Menu</span>\n                    <button id="_toggleMenu" class="hotkeyInput"></button>\n                </div>\n\n                <div class="content-option">\n                    <span class="option-title">Instakill</span>\n                    <button id="_instakill" class="hotkeyInput"></button>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>';

  const Combat_default =
    '<div class="menu-page" data-id="2">\n    <div class="page-title">Combat</div>\n    <p class="page-description">Tune combat logic and PvP behavior</p>\n\n    \x3c!-- Defense --\x3e\n    <div class="section">\n        <div class="section-title">Defense</div>\n        <div class="section-content">\n\n            \x3c!-- <div class="content-option">\n                <span class="option-title">Biome hats</span>\n                <label class="switch-checkbox">\n                    <input id="_biomehats" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div> --\x3e\n\n            \x3c!-- <div class="content-option">\n                <span class="option-title">Auto emp</span>\n                <label class="switch-checkbox">\n                    <input id="_autoemp" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div> --\x3e\n\n            <div class="content-option">\n                <span class="option-title">Anti enemy</span>\n                <label class="switch-checkbox">\n                    <input id="_antienemy" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Basic soldier equipment for all types of antis</span>\n            </div>\n\n            \x3c!-- <div class="content-option">\n                <span class="option-title">Soldier default</span>\n                <label class="switch-checkbox">\n                    <input id="_soldierDefault" type="checkbox"></input>\n                    <span></span>\n                </label>\n\n                <span class="option-description">Equips soldier by default, when antis fail to do its work</span>\n            </div> --\x3e\n\n            \x3c!-- <div class="content-option">\n                <span class="option-title">Anti animal</span>\n                <label class="switch-checkbox">\n                    <input id="_antianimal" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Equips a soldier when danger animal is nearby</span>\n            </div> --\x3e\n\n            <div class="content-option">\n                <span class="option-title">Anti spike</span>\n                <label class="switch-checkbox">\n                    <input id="_antispike" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Adds additional layer of protection against spikes</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Emp Defense</span>\n                <label class="switch-checkbox">\n                    <input id="_empDefense" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Equips emp by default when you are not moving</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Autoheal</span>\n                <label class="switch-checkbox">\n                    <input id="_autoheal" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div>\n            \n            <div class="content-option">\n                <span class="option-title">Autobreak</span>\n                <label class="switch-checkbox">\n                    <input id="_autobreak" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Destroys nearby enemy traps and spikes</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Safe walk</span>\n                <label class="switch-checkbox">\n                    <input id="_safeWalk" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Prevents from colliding enemy spikes, cactuses, boostpads</span>\n            </div>\n        </div>\n    </div>\n\n    \x3c!-- Placement --\x3e\n     <div class="section">\n        <div class="section-title">Placement</div>\n\n        <div class="section-content">\n            <div class="content-option">\n                <span class="option-title">Autoplacer</span>\n                <label class="switch-checkbox">\n                    <input id="_autoplacer" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Automatically places traps and spikes when enemy is nearby</span>\n            </div>\n\n            \x3c!-- <div class="content-option">\n                <span class="option-title">Preplacer</span>\n                <label class="switch-checkbox">\n                    <input id="_preplacer" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div> --\x3e\n\n            <div class="content-option">\n                <span class="option-title">Autoplacer radius</span>\n                <label class="slider">\n                    <span class="slider-value"></span>\n                    <input id="_autoplacerRadius" type="range" step="25" min="100" max="450">\n                </label>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Placement accuracy</span>\n                <label class="slider">\n                    <span class="slider-value"></span>\n                    <input id="_placeAttempts" type="range" min="1" max="10">\n                </label>\n                <span class="option-description">Algorithm calculates all the possible attempts. But later this value decreases in order to avoid lags.</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Automill</span>\n                <label class="switch-checkbox">\n                    <input id="_automill" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Automatically places 3x windmills behind your back</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Auto grind</span>\n                <label class="switch-checkbox">\n                    <input id="_autoGrind" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Stay still to get autogrind working</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Placement Defense</span>\n                <label class="switch-checkbox">\n                    <input id="_placementDefense" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Places a wall/windmill on projectile threats</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Dash Movement</span>\n                <label class="switch-checkbox">\n                    <input id="_dashMovement" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">When holding a boostpad hotkey, it is gonna place boost pad once and immediately destroy it, giving you additional speed.</span>\n            </div>\n        </div>\n    </div>\n    \n    \x3c!-- Instakills --\x3e\n    <div class="section">\n        <div class="section-title">Instakills</div>\n\n        <div class="section-content">\n            <div class="content-option">\n                <span class="option-title">Auto sync</span>\n                <label class="switch-checkbox">\n                    <input id="_autoSync" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Attacks when it is possible to sync enemy with 2 primary weapons</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Velocity tick</span>\n                <label class="switch-checkbox">\n                    <input id="_velocityTick" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Attacks using turret + diamond polearm in one tick</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Spike tick</span>\n                <label class="switch-checkbox">\n                    <input id="_spikeTick" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">When enemy is about to collide a spike, attacks with primary weapon</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Spike sync</span>\n                <label class="switch-checkbox">\n                    <input id="_spikeSync" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Spike sync hammer</span>\n                <label class="switch-checkbox">\n                    <input id="_spikeSyncHammer" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Knockback tick</span>\n                <label class="switch-checkbox">\n                    <input id="_knockbackTick" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Attacks enemy when its possible to knockback on spike</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Knockback tick hammer</span>\n                <label class="switch-checkbox">\n                    <input id="_knockbackTickHammer" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Knockbacks enemy using hammer + turret + primary weapon on spike</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Knockback tick trap</span>\n                <label class="switch-checkbox">\n                    <input id="_knockbackTickTrap" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Destroys a trap and knockbacks enemy on spike</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Anti Retrap</span>\n                <label class="switch-checkbox">\n                    <input id="_antiRetrap" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">When you are trapped, attacks enemy with primary weapon to push it away</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Tool Spear Insta</span>\n                <label class="switch-checkbox">\n                    <input id="_toolSpearInsta" type="checkbox"></input>\n                    <span></span>\n                </label>\n\n                <span class="option-description">When you have Tool Hammer and also Polearm could be upgraded, then it is going to perform instakill on nearest enemy.</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Autosteal</span>\n                <label class="switch-checkbox">\n                    <input id="_autoSteal" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Steals kills/animals from other players</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Autopush</span>\n                <label class="switch-checkbox">\n                    <input id="_autoPush" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Turret steal</span>\n                <label class="switch-checkbox">\n                    <input id="_turretSteal" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Equips a turret hat if possible to kill with it</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Spike Gear Insta</span>\n                <label class="switch-checkbox">\n                    <input id="_spikeGearInsta" type="checkbox"></input>\n                    <span></span>\n                </label>\n\n                <span class="option-description">Equips Spike Gear when it is possible to deal potential damage with it to the enemy. Instakill may happen.</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Turret Sync</span>\n                <label class="switch-checkbox">\n                    <input id="_turretSync" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Attacks using primary in sync with other turret objects</span>\n            </div>\n        </div>\n    </div>\n\n</div>';

  const Visuals_default =
    '<div class="menu-page" data-id="3">\n    <div class="page-title">Visuals</div>\n    <p class="page-description">Adjust visuals and performance options</p>\n\n    \x3c!-- Tracers --\x3e\n    <div class="section">\n        <div class="section-title">Tracers</div>\n        <div class="section-content">\n\n            <div class="content-option">\n                <span class="option-title">Enemies</span>\n                <div class="option-content">\n                    <button class="reset-color" title="Reset Color"></button>\n                    <input id="_enemyTracersColor" type="color" title="Select Color">\n                    <label class="switch-checkbox">\n                        <input id="_enemyTracers" type="checkbox"></input>\n                        <span></span>\n                    </label>\n                </div>\n            </div>\n\n            <div class="content-option">\n                    <span class="option-title">Teammates</span>\n                    <div class="option-content">\n                        <button class="reset-color" title="Reset Color"></button>\n                        <input id="_teammateTracersColor" type="color" title="Select Color">\n                        <label class="switch-checkbox">\n                            <input id="_teammateTracers" type="checkbox"></input>\n                            <span></span>\n                        </label>\n                    </div>\n                </div>\n\n                <div class="content-option">\n                    <span class="option-title">Animal</span>\n                    <div class="option-content">\n                        <button class="reset-color" title="Reset Color"></button>\n                        <input id="_animalTracersColor" type="color" title="Select Color">\n                        <label class="switch-checkbox">\n                            <input id="_animalTracers" type="checkbox"></input>\n                            <span></span>\n                        </label>\n                    </div>\n                </div>\n\n                <div class="content-option">\n                    <span class="option-title">Notification</span>\n                    <div class="option-content">\n                        <button class="reset-color" title="Reset Color"></button>\n                        <input id="_notificationTracersColor" type="color" title="Select Color">\n                        <label class="switch-checkbox">\n                            <input id="_notificationTracers" type="checkbox"></input>\n                            <span></span>\n                        </label>\n                    </div>\n                </div>\n\n        </div>\n    </div>\n\n    \x3c!-- Markers --\x3e\n    <div class="section">\n        <div class="section-title">Markers</div>\n\n        <div class="section-content">\n\n            <div class="content-option">\n                <span class="option-title">Item Markers</span>\n                <div class="option-content">\n                    <button class="reset-color" title="Reset Color"></button>\n                    <input id="_itemMarkersColor" type="color" title="Select Color">\n                    <label class="switch-checkbox">\n                        <input id="_itemMarkers" type="checkbox"></input>\n                        <span></span>\n                    </label>\n                </div>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Teammates</span>\n                <div class="option-content">\n                    <button class="reset-color" title="Reset Color"></button>\n                    <input id="_teammateMarkersColor" type="color" title="Select Color">\n                    <label class="switch-checkbox">\n                        <input id="_teammateMarkers" type="checkbox"></input>\n                        <span></span>\n                    </label>\n                </div>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Enemies</span>\n                <div class="option-content">\n                    <button class="reset-color" title="Reset Color"></button>\n                    <input id="_enemyMarkersColor" type="color" title="Select Color">\n                    <label class="switch-checkbox">\n                        <input id="_enemyMarkers" type="checkbox"></input>\n                        <span></span>\n                    </label>\n                </div>\n            </div>\n                \n        </div>\n    </div>\n\n    \x3c!-- Player --\x3e\n    <div class="section">\n        <div class="section-title">Player</div>\n\n        <div class="section-content">\n\n            <div class="content-option">\n                <span class="option-title">Weapon XP Bar</span>\n                <label class="switch-checkbox">\n                    <input id="_weaponXPBar" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Turret Reload Bar</span>\n                <div class="option-content">\n                    <button class="reset-color" title="Reset Color"></button>\n                    <input id="_playerTurretReloadBarColor" type="color" title="Select Color">\n                    <label class="switch-checkbox">\n                        <input id="_playerTurretReloadBar" type="checkbox"></input>\n                        <span></span>\n                    </label>\n                </div>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Weapon Reload Bar</span>\n                <div class="option-content">\n                    <button class="reset-color" title="Reset Color"></button>\n                    <input id="_weaponReloadBarColor" type="color" title="Select Color">\n                    <label class="switch-checkbox">\n                        <input id="_weaponReloadBar" type="checkbox"></input>\n                        <span></span>\n                    </label>\n                </div>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Render HP</span>\n                <label class="switch-checkbox">\n                    <input id="_renderHP" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div>\n\n            \x3c!-- <div class="content-option">\n                <span class="option-title">Stacked Damage</span>\n                <label class="switch-checkbox">\n                    <input id="_stackedDamage" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div> --\x3e\n        </div>\n    </div>\n\n    \x3c!-- Object --\x3e\n    <div class="section">\n        <div class="section-title">Object</div>\n\n        <div class="section-content">\n\n            <div class="content-option">\n                <span class="option-title">Turret Reload Bar</span>\n                <div class="option-content">\n                    <button class="reset-color" title="Reset Color"></button>\n                    <input id="_objectTurretReloadBarColor" type="color" title="Select Color">\n                    <label class="switch-checkbox">\n                        <input id="_objectTurretReloadBar" type="checkbox"></input>\n                        <span></span>\n                    </label>\n                </div>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Item Health Bar</span>\n                <div class="option-content">\n                    <button class="reset-color" title="Reset Color"></button>\n                    <input id="_itemHealthBarColor" type="color" title="Select Color">\n                    <label class="switch-checkbox">\n                        <input id="_itemHealthBar" type="checkbox"></input>\n                        <span></span>\n                    </label>\n                </div>\n            </div>\n\n        </div>\n    </div>\n\n</div>';

  const Misc_default =
    '<div class="menu-page" data-id="4">\n    <div class="page-title">Misc</div>\n    <p class="page-description">Utility options, automation helpers, and reset tools</p>\n\n    \x3c!-- Other --\x3e\n    <div class="section">\n        <h2 class="section-title">Other</h2>\n\n        <div class="section-content">\n\n            <div class="content-option">\n                <span class="option-title">Kill Message</span>\n                <div class="option-content">\n                    <input id="_killMessageText" class="input" type="text" maxlength="30">\n                    <label class="switch-checkbox">\n                        <input id="_killMessage" type="checkbox">\n                        <span></span>\n                    </label>\n                </div>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Autospawn</span>\n                <label class="switch-checkbox">\n                    <input id="_autospawn" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Autoaccept</span>\n                <label class="switch-checkbox">\n                    <input id="_autoaccept" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div>\n\n            <div class="content-option">\n                \n                    <span></span>\n                </label>\n                <span class="option-description">Some old looking texture pack. Reload the page to make it work! :)</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Hide game HUD</span>\n                <label class="switch-checkbox">\n                    <input id="_hideHUD" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Smooth rendering</span>\n                <label class="slider">\n                    <span class="slider-value"></span>\n                    <input id="_smoothRendering" type="range" step="10" min="100" max="200">\n                </label>\n                <span class="option-description">Control how smoothly your game is being rendering. Higher speeds give you more accurate position of entities, making you analyze situation better.</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Chat Log</span>\n                <label class="switch-checkbox">\n                    <input id="_chatLog" type="checkbox"></input>\n                    <span></span>\n                </label>\n\n                <span class="option-description">Use this only for debugging purposes. Report about any known problems</span>\n            </div>\n\n            <div class="content-option">\n                <button id="resetSettings" class="option-button red">RESET SETTINGS</button>\n            </div>\n\n        </div>\n    </div>\n\n\n    \x3c!-- Menu --\x3e\n    \x3c!-- <div class="section">\n        <h2 class="section-title">Menu</h2>\n\n        <div class="section-content">\n\n            <div class="content-option">\n                <span class="option-title">Transparency</span>\n                <label class="switch-checkbox">\n                    <input id="_menuTransparency" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div>\n\n        </div>\n    </div> --\x3e\n\n</div>';

  const Devtool_default =
    '<div class="menu-page" data-id="6">\n    <div class="page-title">Devtool</div>\n    <p class="page-description">Diagnostics and test toggles</p>\n\n\n    \x3c!-- myPlayer --\x3e\n    <div class="section">\n        <h2 class="section-title">myPlayer</h2>\n\n        <div class="section-content">\n\n            <div class="content-option">\n                <span class="option-title">Display player angle</span>\n                <label class="switch-checkbox">\n                    <input id="_displayPlayerAngle" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div>\n\n        </div>\n    </div>\n\n\n    \x3c!-- Hitboxes --\x3e\n    <div class="section">\n        <h2 class="section-title">Hitboxes</h2>\n\n        <div class="section-content">\n\n            <div class="content-option">\n                <span class="option-title">Weapon hitbox</span>\n                <label class="switch-checkbox">\n                    <input id="_weaponHitbox" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Collision hitbox</span>\n                <label class="switch-checkbox">\n                    <input id="_collisionHitbox" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Placement hitbox</span>\n                <label class="switch-checkbox">\n                    <input id="_placementHitbox" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Possible placement</span>\n                <label class="switch-checkbox">\n                    <input id="_possiblePlacement" type="checkbox"></input>\n                    <span></span>\n                </label>\n            </div>\n        \n        </div>\n    </div>\n\n    \x3c!-- Statistics --\x3e\n    <div class="section">\n        <h2 class="section-title">Statistics</h2>\n\n        <div class="section-content small-section">\n\n            <div class="content-option left-flex text">\n                <span class="option-title">Total kills: </span>\n                <span id="_totalKills" class="text-value">0</span>\n            </div>\n\n            <div class="content-option left-flex text">\n                <span class="option-title">Global kills with bots: </span>\n                <span id="_globalKills" class="text-value">0</span>\n            </div>\n\n            <div class="content-option left-flex text">\n                <span class="option-title">Deaths: </span>\n                <span id="_deaths" class="text-value">0</span>\n            </div>\n\n            <div class="content-option left-flex text">\n                <span class="option-title">Autosync: </span>\n                <span id="_autoSyncTimes" class="text-value">0</span>\n            </div>\n\n            <div class="content-option left-flex text">\n                <span class="option-title">Velocity tick: </span>\n                <span id="_velocityTickTimes" class="text-value">0</span>\n            </div>\n\n            <div class="content-option left-flex text">\n                <span class="option-title">SSHammer: </span>\n                <span id="_spikeSyncHammerTimes" class="text-value">0</span>\n            </div>\n\n            <div class="content-option left-flex text">\n                <span class="option-title">Spike sync: </span>\n                <span id="_spikeSyncTimes" class="text-value">0</span>\n            </div>\n\n            <div class="content-option left-flex text">\n                <span class="option-title">Spike tick: </span>\n                <span id="_spikeTickTimes" class="text-value">0</span>\n            </div>\n\n            <div class="content-option left-flex text">\n                <span class="option-title">KBTrap: </span>\n                <span id="_knockbackTickTrapTimes" class="text-value">0</span>\n            </div>\n\n            <div class="content-option left-flex text">\n                <span class="option-title">KBHammer: </span>\n                <span id="_knockbackTickHammerTimes" class="text-value">0</span>\n            </div>\n\n            <div class="content-option left-flex text">\n                <span class="option-title">KB Reg: </span>\n                <span id="_knockbackTickTimes" class="text-value">0</span>\n            </div>\n\n        </div>\n    </div>\n\n</div>';

  const Bots_default =
    '<div class="menu-page" data-id="5">\n    <div class="page-title">Bots</div>\n    <p class="page-description">Manage bot behavior and controller settings</p>\n\n    \x3c!-- Loadout --\x3e\n    <div class="section">\n        <div class="section-title">Bot Loadout</div>\n        <div class="section-content">\n            <div class="content-option">\n                <span class="option-title">Upgrade Path</span>\n                <div class="option-content">\n                    <select id="_botLoadout" style="width:190px;padding:6px 10px;border-radius:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(155,92,255,0.2);color:#E0E0E0;font-size:13px;">\n                        <option value="KH">Katana + Hammer</option>\n                        <option value="PH">Polearm + Hammer</option>\n                        <option value="DH">Daggers + Hammer</option>\n                        <option value="SH">Sword + Hammer</option>\n                        <option value="BH">Bat + Hammer</option>\n                        <option value="STH">Stick + Hammer</option>\n                        <option value="KS">Katana + Shield</option>\n                        <option value="PS">Polearm + Shield</option>\n                    </select>\n                </div>\n                <span class="option-description">Choose the upgrade path bots will follow</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Autoplay</span>\n                <label class="switch-checkbox">\n                    <input id="_autoplay" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Orbit around your traps and path around blockers automatically</span>\n            </div>\n        </div>\n    </div>\n\n    \x3c!-- Controller --\x3e\n    <div class="section">\n        <div class="section-title">Controller</div>\n\n        <div class="section-content">\n            <div class="content-option">\n                <span class="option-title">Follow cursor</span>\n                <label class="switch-checkbox">\n                    <input id="_followCursor" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Bots are going to follow your cursor instead of character</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Stop movement radius</span>\n                <label class="slider">\n                    <span class="slider-value"></span>\n                    <input id="_movementRadius" type="range" step="25" min="25" max="250">\n                </label>\n                <span class="option-description">Bots will stop movement at this radius</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Circle formation</span>\n                <label class="switch-checkbox">\n                    <input id="_circleFormation" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Bots will form a circle around you</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Circle rotation</span>\n                <label class="switch-checkbox">\n                    <input id="_circleRotation" type="checkbox"></input>\n                    <span></span>\n                </label>\n                <span class="option-description">Bots will move in a circular way around you</span>\n            </div>\n\n            <div class="content-option">\n                <span class="option-title">Circle radius</span>\n                <label class="slider">\n                    <span class="slider-value"></span>\n                    <input id="_circleRadius" type="range" step="25" min="50" max="600">\n                </label>\n            </div>\n        </div>\n\n        <div id="bot-container" class="section-content"></div>\n\n        <div class="content-option centered">\n            <button id="add-bot" class="option-button">Add Bot</button>\n        </div>\n    </div>\n\n</div>';

  const styles_default =
    '@import "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;800&display=swap";\n\n* {\n    user-select: none;\n}\n\n/* Slightly lighter + bluish dark backgrounds */\nheader {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    height: 45px;\n    background: #141824; /* was #121212 â†’ lighter + hint of blue */\n    padding: 10px;\n    border-radius: 6px;\n}\n\nheader .page-title {\n    font-size: 2.3em;\n}\n\nheader #credits {\n    display: flex;\n    justify-content: space-between;\n    gap: 10px;\n    height: 45px;\n}\n\nheader #credits p {\n    margin-top: auto;\n}\n\nheader #logo, header #logoWordmark { display: block; width: auto; height: 100%; } header #logoWordmark { font: 800 18px Noto Sans, sans-serif; letter-spacing: 2px; color: #9ea6ff; display:flex; align-items:center; }\n\nheader #close-button {\n    display: block;\n    fill: #b5b5b5; /* slightly lighter */\n    cursor: pointer;\n    width: auto;\n    height: 100%;\n    transition: fill 200ms;\n}\n\nheader #close-button:hover {\n    fill: #f0f0f0;\n}\n\n@keyframes ripple {\n    from {\n        opacity: 1;\n        transform: scale(0);\n    }\n    to {\n        opacity: 0;\n        transform: scale(0.7);\n    }\n}\n\n#navbar-container {\n    display: flex;\n    flex-direction: column;\n    background: #141824; /* was #121212 */\n    padding: 10px;\n    border-radius: 6px;\n    row-gap: 3px;\n}\n\n#navbar-container .open-menu {\n    position: relative;\n    width: 8.5em;\n    height: 3.2em;\n    background: #0f1322; /* was #0d0d0d â†’ slightly lighter + blue */\n    font-weight: 800;\n    font-size: 1.3em;\n    overflow: hidden;\n    transition: all 400ms;\n    display: flex;\n    justify-content: left;\n    align-items: center;\n    padding: 0px 25px;\n    border-radius: 3px;\n    border: 1px solid rgba(200, 210, 220, 0.08); /* cooler gray border */\n}\n\n.open-menu > span {\n    display: flex;\n    justify-content: left;\n    align-items: center;\n    gap: 10px;\n    transition: all 300ms;\n    pointer-events: none;\n}\n\n.open-menu:hover {\n    background: #3a3d42; /* was #3d3d3d â†’ cooler tone */\n}\n\n.open-menu:hover span {\n    transform: translateY(-2px);\n}\n\n.open-menu.active {\n    background: #3a3d42;\n    pointer-events: none;\n}\n\n#navbar-container .open-menu.bottom-align {\n    margin-top: auto;\n}\n\n#navbar-container .open-menu .ripple {\n    position: absolute;\n    z-index: 5;\n    background: rgba(200, 215, 230, 0.4); /* slightly bluish white ripple */\n    top: 0;\n    left: 0;\n    border-radius: 50%;\n    opacity: 0;\n    animation: ripple 800ms;\n    pointer-events: none;\n}\n\n/* Animations unchanged */\n@keyframes toclose {\n    from {\n        opacity: 1;\n        transform: scale(1);\n    }\n    to {\n        opacity: 0;\n        transform: scale(0);\n    }\n}\n\n@keyframes toopen {\n    from {\n        opacity: 0;\n        transform: scale(0);\n    }\n    to {\n        opacity: 1;\n        transform: scale(1);\n    }\n}\n\n@keyframes appear {\n    from {\n        opacity: 0;\n    }\n    to {\n        opacity: 1;\n    }\n}\n\n#page-container {\n    width: 100%;\n    height: 100%;\n    overflow-y: scroll;\n}\n\n.menu-page {\n    background: #141824; /* consistent background */\n    padding: 10px;\n    border-radius: 6px;\n    display: none;\n}\n\n.menu-page.opened {\n    display: block;\n}\n\n.menu-page .page-title {\n    font-size: 2.8em;\n}\n\n.menu-page > .section {\n    margin-top: 20px;\n    background: #0f1322; /* was #0d0d0d */\n    padding: 15px;\n    border-radius: 6px;\n}\n\n.menu-page > .section .section-title {\n    font-weight: 800;\n    font-size: 1.8em;\n    color: #a0a5aa; /* slightly lighter + bluish gray */\n    margin-bottom: 10px;\n}\n\n.section-content {\n    display: flex;\n    flex-direction: column;\n    gap: 5px;\n}\n\n.small-section {\n    gap: 0px;\n    font-size: 0.85rem;\n}\n\n.menu-page > .section .section-content.split {\n    display: flex;\n    justify-content: space-between;\n    flex-direction: row;\n    column-gap: 30px;\n}\n\n.menu-page > .section .section-content .content-split {\n    width: 50%;\n    display: flex;\n    flex-direction: column;\n    row-gap: 10px;\n}\n\n.menu-page > .section .section-content .content-option {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    min-height: 40px;\n    padding: 3px 10px;\n    transition: background 300ms;\n    border-radius: 8px;\n}\n\n.content-option:hover {\n    background: rgba(60, 65, 75, 0.25); /* cooler hover bg */\n}\n\n.option-description {\n    position: absolute;\n    z-index: 99;\n    visibility: hidden;\n    background: #282b30; /* was #2a2a2a â†’ bluish dark */\n    padding: 8px;\n    border-radius: 6px;\n    font-weight: 600;\n    pointer-events: none;\n    max-width: 300px;\n}\n\n.description-show {\n    visibility: visible;\n}\n\n.menu-page > .section .content-option.centered {\n    display: flex;\n    justify-content: center;\n}\n\n.menu-page > .section .section-content .content-option .option-title {\n    font-weight: 800;\n    font-size: 1.4em;\n    color: #60656b; /* was #585858 â†’ lighter + cooler */\n    transition: color 300ms;\n}\n\n.menu-page > .section .section-content .content-option .option-content {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    column-gap: 10px;\n}\n\n.menu-page > .section .section-content .content-option .disconnect-button {\n    width: 30px;\n    height: 30px;\n    cursor: pointer;\n    fill: rgba(130, 55, 60, 0.5); /* slightly softened */\n    transition: fill 300ms;\n}\n\n.menu-page > .section .section-content .content-option:hover .option-title {\n    color: #888c92; /* was #7e7d7d */\n}\n\n.menu-page > .section .section-content .content-option:hover .disconnect-button {\n    fill: #8a3636;\n}\n\n.menu-page > .section .section-content .content-option:hover .disconnect-button:hover {\n    fill: #983a3a;\n}\n\n.menu-page > .section .section-content .text {\n    display: flex;\n    justify-content: left;\n    gap: 10px;\n}\n\n.menu-page > .section .section-content .text .text-value {\n    color: #8e8888; /* slightly lighter */\n    font-weight: 800;\n    font-size: 1.5em;\n}\n\n.simplified {\n    font-weight: 600 !important;\n    font-size: 1.2em !important;\n    word-spacing: 2px;\n}\n\n.highlight {\n    color: #c0c5ca; /* cooler highlight */\n}\n\n.menu-page > .section .option-button {\n    /* width: 117px;\n    height: 45px; */\n    background: #2e3136; /* was #303030 â†’ bluish dark */\n    border: 5px solid #24272b; /* was #262626 */\n    padding: 10px 30px;\n    border-radius: 6px;\n    font-weight: 800;\n    font-size: 1.1em;\n    color: #888c92;\n    transition: background 300ms, border-color 300ms;\n}\n\n\n#bot-container {\n    margin: 10px 0;\n}\n\n.menu-page > .section .option-button:hover {\n    background: #34383d;\n    border-color: #282b30;\n}\n\n.menu-page > .section .section-content .hotkeyInput {\n    width: 90px;\n    height: 40px;\n    background: #2e3136;\n    border: 5px solid #24272b;\n    border-radius: 6px;\n    font-weight: 800;\n    font-size: 1.1em;\n    color: #888c92;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transition: background 300ms, border-color 300ms, color 300ms;\n}\n\n.menu-page > .section .section-content .hotkeyInput:hover {\n    background: #34383d;\n    border-color: #282b30;\n}\n\n.menu-page > .section .section-content .hotkeyInput.active {\n    background: #3a3e44;\n    border-color: #2c3035;\n}\n\n.red {\n    background: #853838!important;\n    border-color: #6f2f2f!important;\n    color: #c07878!important;\n}\n\n.red:hover {\n    background: #b24848!important;\n    border-color: #753131!important;\n}\n\n.red.active {\n    background: #9c4040!important;\n    border-color: #753131!important;\n}\n\n.menu-page > .section .section-content .switch-checkbox {\n    position: relative;\n    width: 90px;\n    height: 34px;\n}\n\n.menu-page > .section .section-content .switch-checkbox input {\n    width: 0;\n    height: 0;\n    opacity: 0;\n}\n\n.input {\n    outline: 3px solid transparent;\n    border: none;\n    text-align: center;\n    padding: 0;\n    margin: 0;\n    width: 225px;\n    height: 30px;\n    background: #2e3136;\n    box-shadow: 0px -6px 0px 0px #24272b inset;\n    border-radius: 6px;\n    font-weight: 800;\n    font-size: 1.1em;\n    color: #888c92;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transition: background 300ms, border-color 300ms, color 300ms, outline 300ms;\n}\n\n.input:focus {\n    outline: 3px solid #757a80; /* cooler focus ring */\n}\n\n.menu-page > .section .section-content .switch-checkbox input:checked + span {\n    background: #3a3e44;\n    box-shadow: 0px -17px 0px 0px #2f3338 inset;\n}\n\n.menu-page > .section .section-content .switch-checkbox input:checked + span:before {\n    transform: translateX(50px) scale(0.6);\n    background: #888c92;\n}\n\n.menu-page > .section .section-content .switch-checkbox span {\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    background: #2e3136;\n    border-radius: 6px;\n    box-shadow: 0px -17px 0px 0px #282b30 inset;\n}\n\n.menu-page > .section .section-content .switch-checkbox span:before {\n    position: absolute;\n    content: "";\n    transform: scale(0.6);\n    transition: transform 300ms;\n    width: 40px;\n    height: 40px;\n    border-radius: 6px;\n    background: #60656b;\n}\n\n.menu-page > .section .section-content input[id][type="color"] {\n    width: 60px;\n    height: 33.3333333333px;\n    outline: none;\n    border: none;\n    padding: 3px;\n    margin: 0;\n    background: #2e3136;\n    border-radius: 6px;\n    cursor: pointer;\n}\n\n.menu-page > .section .section-content .reset-color {\n    background: var(--data-color);\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n}\n\n.menu-page > .section .section-content .slider {\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n}\n\n.menu-page > .section .section-content .slider input {\n    appearance: none;\n    outline: none;\n    cursor: pointer;\n    padding: 0;\n    margin: 0;\n    border: none;\n    width: 144px;\n    height: 30px;\n    background: #3a3e44;\n    box-shadow: 0px -15px 0px 0px #2f3338 inset;\n    border-radius: 6px;\n}\n\n.menu-page > .section .section-content .slider input::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    transform: scale(0.7);\n    width: 30px;\n    height: 30px;\n    background: #888c92;\n    border-radius: 6px;\n}\n\n.menu-page > .section .section-content .slider .slider-value {\n    color: #60656b;\n    font-weight: 800;\n    font-size: 1.4em;\n    opacity: 0.4;\n}\n\n.left-flex {\n    display: flex;\n    justify-content: left !important;\n    gap: 10px;\n}\n\nhtml,\nbody {\n    margin: 0;\n    padding: 0;\n    scrollbar-width: thin;\n    scrollbar-track-color: #2e3136;\n    scrollbar-face-color: #24272b;\n    overflow: hidden;\n}\n\n* {\n    font-family: "Noto Sans", sans-serif;\n    color: #f2f4f6; /* slightly softer white */\n}\n\nh1, .page-title {\n    font-weight: 800;\n    margin: 0;\n}\n\nh2 {\n    margin: 0;\n}\n\np {\n    font-weight: 800;\n    font-size: 1.1rem;\n    margin: 0;\n    color: #c0c5ca; /* cooler light gray */\n}\n\nbutton {\n    border: none;\n    outline: none;\n    cursor: pointer;\n}\n\n#menu-container {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 1280px;\n    height: 720px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n#menu-container.transparent #menu-wrapper {\n    background: rgba(10, 12, 16, 0.6); /* bluish transparent */\n    backdrop-filter: blur(3px);\n    box-shadow: 0 0 15px rgba(0, 10, 20, 0.4); /* subtle blue shadow */\n}\n\n#menu-container.transparent header,\n#menu-container.transparent .menu-page,\n#menu-container.transparent #navbar-container {\n    background: rgba(22, 24, 28, 0.59); /* matching transparent bg */\n}\n\n#menu-container.transparent .section {\n    background: rgba(16, 18, 21, 0.46);\n}\n\n#menu-container.transparent .open-menu {\n    background: rgba(16, 18, 21, 0.46);\n}\n\n#menu-container.transparent .open-menu:hover,\n#menu-container.transparent .open-menu.active {\n    background: rgba(58, 61, 66, 0.60);\n}\n\n#menu-wrapper {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    row-gap: 5px;\n    width: 85%;\n    height: 85%;\n    padding: 10px;\n    border-radius: 6px;\n    background: #0a0c10; /* bluish black */\n}\n\n#menu-wrapper.toclose {\n    animation: 150ms ease-in toclose forwards;\n}\n\n#menu-wrapper.toopen {\n    animation: 150ms ease-in toopen forwards;\n}\n\nmain {\n    display: flex;\n    column-gap: 10px;\n    width: 100%;\n    height: calc(100% - 75px);\n}\n\n::-webkit-scrollbar {\n    width: 12px;\n}\n\n::-webkit-scrollbar-track {\n    background: #2e3136;\n    border-radius: 6px;\n}\n\n::-webkit-scrollbar-thumb {\n    background: #24272b;\n    border-radius: 6px;\n}\n\n.icon {\n    width: 50px;\n    height: 50px;\n}\n\n.small-icon {\n    width: 22px;\n    height: 22px;\n}';

  const Game_default =
    '#iframe-container {\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    border: none;\n    outline: none;\n    z-index: 10;\n}\n\n#promoImgHolder,\n.menuHeader,\n.menuText,\n#guideCard,\n#altServer,\n#gameName,\n#pingDisplay,\n#partyButton,\n#onetrust-consent-sdk,\n.adMenuCard,\n#topInfoHolder > div:not([id]):not([class]),\n#touch-controls-fullscreen,\n#altcha,\n#joinPartyButton {\n    display: none!important;\n}\n\n.menuCard {\n    box-shadow: none;\n}\n\n#setupCard {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n    background: #6d6d6d77;\n    max-height: auto;\n    width: 280px;\n}\n\n#setupCard > * {\n    margin: 0!important;\n}\n\n#linksContainer2 {\n    background: #6d6d6d77;\n}\n\n#bottomContainer {\n    bottom: 20px;\n}\n\n#topInfoHolder {\n    display: flex;\n    flex-direction: column;\n    justify-content: right;\n    align-items: flex-end;\n    gap: 10px;\n}\n\n#killCounter, #totalKillCounter {\n    position: static;\n    margin: 0;\n    background-image: url(../img/icons/skull.png);\n}\n\n.actionBarItem {\n    position: relative;\n}\n\n.itemCounter {\n    position: absolute;\n    top: 3px;\n    right: 3px;\n    font-size: 0.95em;\n    color: white;\n    text-shadow: #3d3f42 2px 0px 0px, #3d3f42 1.75517px 0.958851px 0px, #3d3f42 1.0806px 1.68294px 0px, #3d3f42 0.141474px 1.99499px 0px, #3d3f42 -0.832294px 1.81859px 0px, #3d3f42 -1.60229px 1.19694px 0px, #3d3f42 -1.97998px 0.28224px 0px, #3d3f42 -1.87291px -0.701566px 0px, #3d3f42 -1.30729px -1.5136px 0px, #3d3f42 -0.421592px -1.95506px 0px, #3d3f42 0.567324px -1.91785px 0px, #3d3f42 1.41734px -1.41108px 0px, #3d3f42 1.92034px -0.558831px 0px;\n}\n\n.itemCounter.hidden {\n    display: none;\n}\n\n#AtlantisStats {\n    position: absolute;\n    color: rgb(221, 221, 221);\n    font: 13px "Hammersmith One";\n    bottom: 210px;\n    left: 20px;\n\n    display: flex;\n    flex-direction: column;\n    gap: 5px;\n}\n\n.hidden {\n    display: none!important;\n}\n\n#chatLog {\n    position: absolute;\n    top: 65px;\n    left: 10px;\n\n    width: 380px;\n    height: 180px;\n\n    background: rgba(10, 12, 16, 0.6);\n    padding: 10px;\n    color: #f2f4f6;\n    border-radius: 6px;\n\n    display: flex;\n    flex-direction: column;\n}\n\n#chatLogHeader {\n    font-size: 1.8rem;\n    margin: 0 0 5px 0;\n    flex-shrink: 0;\n}\n\n#messageContainer {\n    flex: 1;\n    overflow-y: auto;\n    overflow-x: hidden;\n}\n\n#messageContainer::-webkit-scrollbar {\n    width: 6px;\n}\n\n#messageContainer::-webkit-scrollbar-track {\n    background: #4c4f55;\n    border-radius: 6px;\n}\n\n#messageContainer::-webkit-scrollbar-thumb {\n    background: #303338;\n    border-radius: 6px;\n}\n\n.logMessage {\n    display: flex;\n    gap: 8px;\n    align-items: flex-start;\n}\n\n.logMessage span {\n    word-break: break-word;\n    overflow-wrap: anywhere;\n}\n\n.logMessage .darken {\n    white-space: nowrap;\n    flex-shrink: 0;\n}\n\n.logMessage .log,\n.logMessage .warn,\n.logMessage .error {\n    flex: 1;\n    min-width: 0;\n}';

  const Store_default =
    "#storeContainer {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    max-width: 400px;\n    width: 100%;\n\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%) scale(0.9);\n}\n\n#toggleStoreType {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 10px;\n    background-color: rgba(0, 0, 0, 0.15);\n    color: #fff;\n    border-radius: 4px;\n    cursor: pointer;\n    font-size: 20px;\n    pointer-events: all;\n}\n\n#itemHolder {\n    background-color: rgba(0, 0, 0, 0.15);\n    max-height: 200px;\n    height: 100%;\n    padding: 10px;\n    overflow-y: scroll;\n    border-radius: 4px;\n    pointer-events: all;\n    scrollbar-width: none;\n}\n\n#itemHolder::-webkit-scrollbar {\n    display: none;\n    width: 0;\n    height: 0;\n    background: transparent;\n}\n\n.storeItemContainer {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 5px;\n    height: 50px;\n    box-sizing: border-box;\n    overflow: hidden;\n}\n\n.storeHat {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 45px;\n    height: 45px;\n    margin-top: -5px;\n    pointer-events: none;\n}\n\n.storeItemName {\n    color: #fff;\n    font-size: 20px;\n}\n\n.equipButton {\n    margin-left: auto;\n    color: #80eefc;\n    cursor: pointer;\n    font-size: 35px;\n}";

  const Hats = {
    0: {
      index: 0,
      id: 0,
      name: "Unequip",
      dontSell: !0,
      price: 0,
      scale: 0,
      description: "None",
    },
    45: {
      index: 1,
      id: 45,
      name: "Shame!",
      dontSell: !0,
      price: 0,
      scale: 120,
      description: "hacks are for losers",
    },
    51: {
      index: 2,
      id: 51,
      name: "Moo Cap",
      price: 0,
      scale: 120,
      description: "coolest mooer around",
    },
    50: {
      index: 3,
      id: 50,
      name: "Apple Cap",
      price: 0,
      scale: 120,
      description: "apple farms remembers",
    },
    28: {
      index: 4,
      id: 28,
      name: "Moo Head",
      price: 0,
      scale: 120,
      description: "no effect",
    },
    29: {
      index: 5,
      id: 29,
      name: "Pig Head",
      price: 0,
      scale: 120,
      description: "no effect",
    },
    30: {
      index: 6,
      id: 30,
      name: "Fluff Head",
      price: 0,
      scale: 120,
      description: "no effect",
    },
    36: {
      index: 7,
      id: 36,
      name: "Pandou Head",
      price: 0,
      scale: 120,
      description: "no effect",
    },
    37: {
      index: 8,
      id: 37,
      name: "Bear Head",
      price: 0,
      scale: 120,
      description: "no effect",
    },
    38: {
      index: 9,
      id: 38,
      name: "Monkey Head",
      price: 0,
      scale: 120,
      description: "no effect",
    },
    44: {
      index: 10,
      id: 44,
      name: "Polar Head",
      price: 0,
      scale: 120,
      description: "no effect",
    },
    35: {
      index: 11,
      id: 35,
      name: "Fez Hat",
      price: 0,
      scale: 120,
      description: "no effect",
    },
    42: {
      index: 12,
      id: 42,
      name: "Enigma Hat",
      price: 0,
      scale: 120,
      description: "join the enigma army",
    },
    43: {
      index: 13,
      id: 43,
      name: "Blitz Hat",
      price: 0,
      scale: 120,
      description: "hey everybody i'm blitz",
    },
    49: {
      index: 14,
      id: 49,
      name: "Bob XIII Hat",
      price: 0,
      scale: 120,
      description: "like and subscribe",
    },
    57: {
      index: 15,
      id: 57,
      name: "Pumpkin",
      price: 50,
      scale: 120,
      description: "Spooooky",
    },
    8: {
      index: 16,
      id: 8,
      name: "Bummle Hat",
      price: 100,
      scale: 120,
      description: "no effect",
    },
    2: {
      index: 17,
      id: 2,
      name: "Straw Hat",
      price: 500,
      scale: 120,
      description: "no effect",
    },
    15: {
      index: 18,
      id: 15,
      name: "Winter Cap",
      price: 600,
      scale: 120,
      description: "allows you to move at normal speed in snow",
      coldM: 1,
    },
    5: {
      index: 19,
      id: 5,
      name: "Cowboy Hat",
      price: 1e3,
      scale: 120,
      description: "no effect",
    },
    4: {
      index: 20,
      id: 4,
      name: "Ranger Hat",
      price: 2e3,
      scale: 120,
      description: "no effect",
    },
    18: {
      index: 21,
      id: 18,
      name: "Explorer Hat",
      price: 2e3,
      scale: 120,
      description: "no effect",
    },
    31: {
      index: 22,
      id: 31,
      name: "Flipper Hat",
      price: 2500,
      scale: 120,
      description: "have more control while in water",
      watrImm: !0,
    },
    1: {
      index: 23,
      id: 1,
      name: "Marksman Cap",
      price: 3e3,
      scale: 120,
      description: "increases arrow speed and range",
      aMlt: 1.3,
    },
    10: {
      index: 24,
      id: 10,
      name: "Bush Gear",
      price: 3e3,
      scale: 160,
      description: "allows you to disguise yourself as a bush",
    },
    48: {
      index: 25,
      id: 48,
      name: "Halo",
      price: 3e3,
      scale: 120,
      description: "no effect",
    },
    6: {
      index: 26,
      id: 6,
      name: "Soldier Helmet",
      price: 4e3,
      scale: 120,
      description: "reduces damage taken but slows movement",
      spdMult: 0.94,
      dmgMult: 0.75,
    },
    23: {
      index: 27,
      id: 23,
      name: "Anti Venom Gear",
      price: 4e3,
      scale: 120,
      description: "makes you immune to poison",
      poisonRes: 1,
    },
    13: {
      index: 28,
      id: 13,
      name: "Medic Gear",
      price: 5e3,
      scale: 110,
      description: "slowly regenerates health over time",
      healthRegen: 3,
    },
    9: {
      index: 29,
      id: 9,
      name: "Miners Helmet",
      price: 5e3,
      scale: 120,
      description: "earn 1 extra gold per resource",
      extraGold: 1,
    },
    32: {
      index: 30,
      id: 32,
      name: "Musketeer Hat",
      price: 5e3,
      scale: 120,
      description: "reduces cost of projectiles",
      projCost: 0.5,
    },
    7: {
      index: 31,
      id: 7,
      name: "Bull Helmet",
      price: 6e3,
      scale: 120,
      description: "increases damage done but drains health",
      healthRegen: -5,
      dmgMultO: 1.5,
      spdMult: 0.96,
    },
    22: {
      index: 32,
      id: 22,
      name: "Emp Helmet",
      price: 6e3,
      scale: 120,
      description: "turrets won't attack but you move slower",
      antiTurret: 1,
      spdMult: 0.7,
    },
    12: {
      index: 33,
      id: 12,
      name: "Booster Hat",
      price: 6e3,
      scale: 120,
      description: "increases your movement speed",
      spdMult: 1.16,
    },
    26: {
      index: 34,
      id: 26,
      name: "Barbarian Armor",
      price: 8e3,
      scale: 120,
      description: "knocks back enemies that attack you",
      dmgK: 0.6,
    },
    21: {
      index: 35,
      id: 21,
      name: "Plague Mask",
      price: 1e4,
      scale: 120,
      description: "melee attacks deal poison damage",
      poisonDmg: 5,
      poisonTime: 6,
    },
    46: {
      index: 36,
      id: 46,
      name: "Bull Mask",
      price: 1e4,
      scale: 120,
      description: "bulls won't target you unless you attack them",
      bullRepel: 1,
    },
    14: {
      index: 37,
      id: 14,
      name: "Windmill Hat",
      topSprite: !0,
      price: 1e4,
      scale: 120,
      description: "generates points while worn",
      pps: 1.5,
    },
    11: {
      index: 38,
      id: 11,
      name: "Spike Gear",
      topSprite: !0,
      price: 1e4,
      scale: 120,
      description: "deal damage to players that damage you",
      dmg: 0.45,
    },
    53: {
      index: 39,
      id: 53,
      name: "Turret Gear",
      topSprite: !0,
      price: 1e4,
      scale: 120,
      description: "you become a walking turret",
      turret: {
        projectile: 1,
        range: 700,
        rate: 2500,
      },
      spdMult: 0.7,
      knockback: 60,
    },
    20: {
      index: 40,
      id: 20,
      name: "Samurai Armor",
      price: 12e3,
      scale: 120,
      description: "increased attack speed and fire rate",
      atkSpd: 0.78,
    },
    58: {
      index: 41,
      id: 58,
      name: "Dark Knight",
      price: 12e3,
      scale: 120,
      description: "restores health when you deal damage",
      healD: 0.4,
    },
    27: {
      index: 42,
      id: 27,
      name: "Scavenger Gear",
      price: 15e3,
      scale: 120,
      description: "earn double points for each kill",
      kScrM: 2,
    },
    40: {
      index: 43,
      id: 40,
      name: "Tank Gear",
      price: 15e3,
      scale: 120,
      description: "increased damage to buildings but slower movement",
      spdMult: 0.3,
      bDmg: 3.3,
    },
    52: {
      index: 44,
      id: 52,
      name: "Thief Gear",
      price: 15e3,
      scale: 120,
      description: "steal half of a players gold when you kill them",
      goldSteal: 0.5,
    },
    55: {
      index: 45,
      id: 55,
      name: "Bloodthirster",
      price: 2e4,
      scale: 120,
      description: "Restore Health when dealing damage. And increased damage",
      healD: 0.25,
      dmgMultO: 1.2,
    },
    56: {
      index: 46,
      id: 56,
      name: "Assassin Gear",
      price: 2e4,
      scale: 120,
      description: "Go invisible when not moving. Can't eat. Increased speed",
      noEat: !0,
      spdMult: 1.1,
      invisTimer: 1e3,
    },
  },
    Accessories = {
      0: {
        index: 0,
        id: 0,
        name: "Unequip",
        dontSell: !0,
        price: 0,
        scale: 0,
        xOffset: 0,
        description: "None",
      },
      12: {
        index: 1,
        id: 12,
        name: "Snowball",
        price: 1e3,
        scale: 105,
        xOffset: 18,
        description: "no effect",
      },
      9: {
        index: 2,
        id: 9,
        name: "Tree Cape",
        price: 1e3,
        scale: 90,
        description: "no effect",
      },
      10: {
        index: 3,
        id: 10,
        name: "Stone Cape",
        price: 1e3,
        scale: 90,
        description: "no effect",
      },
      3: {
        index: 4,
        id: 3,
        name: "Cookie Cape",
        price: 1500,
        scale: 90,
        description: "no effect",
      },
      8: {
        index: 5,
        id: 8,
        name: "Cow Cape",
        price: 2e3,
        scale: 90,
        description: "no effect",
      },
      11: {
        index: 6,
        id: 11,
        name: "Monkey Tail",
        price: 2e3,
        scale: 97,
        xOffset: 25,
        description: "Super speed but reduced damage",
        spdMult: 1.35,
        dmgMultO: 0.2,
      },
      17: {
        index: 7,
        id: 17,
        name: "Apple Basket",
        price: 3e3,
        scale: 80,
        xOffset: 12,
        description: "slowly regenerates health over time",
        healthRegen: 1,
      },
      6: {
        index: 8,
        id: 6,
        name: "Winter Cape",
        price: 3e3,
        scale: 90,
        description: "no effect",
      },
      4: {
        index: 9,
        id: 4,
        name: "Skull Cape",
        price: 4e3,
        scale: 90,
        description: "no effect",
      },
      5: {
        index: 10,
        id: 5,
        name: "Dash Cape",
        price: 5e3,
        scale: 90,
        description: "no effect",
      },
      2: {
        index: 11,
        id: 2,
        name: "Dragon Cape",
        price: 6e3,
        scale: 90,
        description: "no effect",
      },
      1: {
        index: 12,
        id: 1,
        name: "Super Cape",
        price: 8e3,
        scale: 90,
        description: "no effect",
      },
      7: {
        index: 13,
        id: 7,
        name: "Troll Cape",
        price: 8e3,
        scale: 90,
        description: "no effect",
      },
      14: {
        index: 14,
        id: 14,
        name: "Thorns",
        price: 1e4,
        scale: 115,
        xOffset: 20,
        description: "no effect",
      },
      15: {
        index: 15,
        id: 15,
        name: "Blockades",
        price: 1e4,
        scale: 95,
        xOffset: 15,
        description: "no effect",
      },
      20: {
        index: 16,
        id: 20,
        name: "Devils Tail",
        price: 1e4,
        scale: 95,
        xOffset: 20,
        description: "no effect",
      },
      16: {
        index: 17,
        id: 16,
        name: "Sawblade",
        price: 12e3,
        scale: 90,
        spin: !0,
        xOffset: 0,
        description: "deal damage to players that damage you",
        dmg: 0.15,
      },
      13: {
        index: 18,
        id: 13,
        name: "Angel Wings",
        price: 15e3,
        scale: 138,
        xOffset: 22,
        description: "slowly regenerates health over time",
        healthRegen: 3,
      },
      19: {
        index: 19,
        id: 19,
        name: "Shadow Wings",
        price: 15e3,
        scale: 138,
        xOffset: 22,
        description: "increased movement speed",
        spdMult: 1.1,
      },
      18: {
        index: 20,
        id: 18,
        name: "Blood Wings",
        price: 2e4,
        scale: 178,
        xOffset: 26,
        description: "restores health when you deal damage",
        healD: 0.2,
      },
      21: {
        index: 21,
        id: 21,
        name: "Corrupt X Wings",
        price: 2e4,
        scale: 178,
        xOffset: 26,
        description: "deal damage to players that damage you",
        dmg: 0.25,
      },
    },
    store = [Hats, Accessories];

  const DataHandler = new (class {
    isWeaponType(type) {
      return type <= 1;
    }
    isItemType(type) {
      return type >= 2;
    }
    getStore(type) {
      return store[type];
    }
    getStoreItem(type, id) {
      switch (type) {
        case 0:
          return Hats[id];

        case 1:
          return Accessories[id];

        default:
          throw Error(`getStoreItem Error: type "${type}" is not defined`);
      }
    }
    getProjectile(id) {
      return Projectiles[this.getWeapon(id).projectile];
    }
    getWeapon(id) {
      return Weapons[id];
    }
    getItem(id) {
      return Items[id];
    }
    isWeapon(id) {
      return this.getWeapon(id) !== void 0;
    }
    isItem(id) {
      return Items[id] !== void 0;
    }
    isPrimary(id) {
      return id != null && this.getWeapon(id).itemType === 0;
    }
    isSecondary(id) {
      return id != null && this.getWeapon(id).itemType === 1;
    }
    isMelee(id) {
      return id != null && "damage" in this.getWeapon(id);
    }
    isAttackable(id) {
      return id != null && "range" in this.getWeapon(id);
    }
    isShootable(id) {
      return id != null && "projectile" in this.getWeapon(id);
    }
    isPlaceable(id) {
      return id !== -1 && "itemGroup" in Items[id];
    }
    isHealable(id) {
      return "restore" in Items[id];
    }
    isDestroyable(id) {
      return "health" in Items[id];
    }
    canMoveOnTop(id) {
      return "ignoreCollision" in Items[id];
    }
  })(),
    DataHandler_default = DataHandler;

  class ObjectItem {
    id;
    pos;
    angle;
    scale = 0;
    constructor(id, x, y, angle, scale) {
      ((this.id = id),
        (this.pos = {
          current: new Vector_default(x, y),
        }),
        (this.angle = angle),
        (this.scale = scale));
    }
    get hitScale() {
      return this.scale;
    }
  }

  class Resource extends ObjectItem {
    type;
    layer;
    constructor(id, x, y, angle, scale, type) {
      super(id, x, y, angle, scale);
      ((this.type = type), (this.layer = type === 0 ? 3 : type === 2 ? 0 : 2));
    }
    formatScale(scaleMult = 1) {
      let reduceScale =
        this.type === 0 || this.type === 1 ? 0.6 * scaleMult : 1;
      return this.scale * reduceScale;
    }
    get collisionScale() {
      return this.formatScale();
    }
    get placementScale() {
      return this.formatScale(0.6);
    }
    get isCactus() {
      return this.type === 1 && pointInDesert(this.pos.current);
    }
    getDamage() {
      if (this.isCactus) {
        return 35;
      }
      return 0;
    }
  }

  class PlayerObject extends ObjectItem {
    type;
    ownerID;
    collisionDivider;
    health;
    tempHealth;
    maxHealth;
    reload = -1;
    maxReload = -1;
    isDestroyable;
    destroyingTick = 0;
    canBeDestroyed = !1;
    trapActivated = !1;
    wasTeammate = !1;
    seenPlacement = !1;
    layer;
    itemGroup;
    projectile = null;
    constructor(id, x, y, angle, scale, type, ownerID) {
      super(id, x, y, angle, scale);
      ((this.type = type), (this.ownerID = ownerID));
      let item = Items[type];
      if (
        ((this.collisionDivider = "colDiv" in item ? item.colDiv : 1),
          (this.health = "health" in item ? item.health : 1 / 0),
          (this.tempHealth = this.health),
          (this.maxHealth = this.health),
          (this.isDestroyable = this.maxHealth !== 1 / 0),
          item.id === 17)
      ) {
        ((this.reload = Math.ceil(item.shootRate / 111)),
          (this.maxReload = this.reload));
      }
      ((this.layer = ItemGroups[item.itemGroup].layer),
        (this.itemGroup = item.itemGroup));
    }
    formatScale(placeCollision = !1) {
      return this.scale * (placeCollision ? 1 : this.collisionDivider);
    }
    get collisionScale() {
      return this.formatScale();
    }
    get placementScale() {
      let item = Items[this.type];
      if (item.id === 21) {
        return item.blocker;
      }
      return this.scale;
    }
    get isSpike() {
      return this.itemGroup === 2;
    }
    getDamage() {
      if (this.isSpike) {
        let type = this.type;
        return DataHandler_default.getItem(type).damage;
      }
      return 0;
    }
  }

  class Entity {
    id = -1;
    pos = {
      previous: new Vector_default(),
      current: new Vector_default(),
      future: new Vector_default(),
    };
    angle = 0;
    scale = 0;
    speed = 0;
    move_dir = 0;
    setFuturePosition() {
      let { previous: previous, current: current, future: future } = this.pos,
        distance = previous.distance(current);
      this.speed = distance;
      let angle = previous.angle(current);
      ((this.move_dir = angle),
        future.setVec(current.addDirection(angle, distance)));
    }
    get collisionScale() {
      return this.scale;
    }
    get hitScale() {
      return this.scale * 1.8;
    }
    client;
    constructor(client) {
      this.client = client;
    }
    getFuturePosition(speed) {
      return this.pos.current
        .copy()
        .add(Vector_default.fromAngle(this.move_dir, speed));
    }
    colliding(object, radius) {
      let { previous: a0, current: a1, future: a2 } = this.pos,
        b0 = object.pos.current;
      return (
        a0.distance(b0) <= radius ||
        a1.distance(b0) <= radius ||
        a2.distance(b0) <= radius
      );
    }
    collidingObject(object, addRadius = 0, checkType = 3) {
      let { previous: a0, current: a1, future: a2 } = this.pos,
        b0 = object.pos.current,
        radius = this.collisionScale + object.collisionScale + addRadius;
      return (
        (!!(checkType & 4) && a0.distance(b0) <= radius) ||
        (!!(checkType & 2) && a1.distance(b0) <= radius) ||
        (!!(checkType & 1) && a2.distance(b0) <= radius)
      );
    }
    collidingSimple(entity, range, tempPos = this.pos.current) {
      let pos1 = tempPos,
        pos2 = entity.pos.current;
      return pos1.distance(pos2) <= range;
    }
    collidingEntity(entity, range, checkBased = !1, prev = !0) {
      let { previous: a0, current: a1, future: a2 } = this.pos,
        { previous: b0, current: b1, future: b2 } = entity.pos;
      if (checkBased) {
        return (
          (prev && a0.distance(b0) <= range) ||
          a1.distance(b1) <= range ||
          a2.distance(b2) <= range
        );
      }
      return (
        a0.distance(b0) <= range ||
        a0.distance(b1) <= range ||
        a0.distance(b2) <= range ||
        a1.distance(b0) <= range ||
        a1.distance(b1) <= range ||
        a1.distance(b2) <= range ||
        a2.distance(b0) <= range ||
        a2.distance(b1) <= range ||
        a2.distance(b2) <= range
      );
    }
    runningAwayFrom(entity, angle) {
      if (angle === null) {
        return !1;
      }
      let pos1 = this.pos.current,
        pos2 = entity.pos.current,
        angleTo = pos1.angle(pos2);
      if (getAngleDist(angle, angleTo) <= Math.PI / 2) {
        return !1;
      }
      return !0;
    }
  }

  const Entity_default = Entity;

  class EnemyManager {
    client;
    dangerousEnemies = [];
    _nearestEnemy = [null, null];
    nearestDangerAnimal = null;
    nearestTrap = null;
    nearestCollider = null;
    secondNearestCollider = null;
    nearestEnemySpikeCollider = null;
    spikeCollider = null;
    enemySpikeCollider = null;
    nearestTurretEntity = null;
    detectedEnemy = !1;
    dangerWithoutSoldier = !1;
    detectedDangerEnemy = !1;
    nearestTrappedEnemy = null;
    previousTrappedEnemy = null;
    nearestPlayerObject = null;
    secondNearestPlayerObject = null;
    nearestObject = null;
    nearestEnemyObject = null;
    secondNearestEnemyObject = null;
    nearestSpike = null;
    willCollideSpike = !1;
    collidingSpike = !1;
    nearestSpikePlacerAngle = null;
    prevNearestSpikePlacerAngle = null;
    nearestEnemyToNearestEnemy = null;
    enemyCanPlaceSpike = !1;
    possibleToKnockback = !1;
    potentialSpikeKnockbackDamage = 0;
    potentialSpikeDamage = 0;
    potentialDamage = 0;
    primaryDamage = 0;
    detectedDanger = !1;
    reverseInsta = !1;
    rangedBowInsta = !1;
    spikeSyncThreat = !1;
    velocityTickThreat = !1;
    nearestLowEntity = null;
    nearestEnemyPush = null;
    nearestPushSpike = null;
    nearestLowHPObjectPrev = null;
    nearestLowHPObject = null;
    nearestSyncEnemy = null;
    constructor(client) {
      this.client = client;
    }
    preReset() {
      ((this._nearestEnemy[0] = null),
        (this._nearestEnemy[1] = null),
        (this.nearestDangerAnimal = null),
        (this.nearestLowEntity = null));
    }
    reset() {
      ((this.nearestEnemyToNearestEnemy = null),
        (this.willCollideSpike = !1),
        (this.collidingSpike = !1),
        (this.prevNearestSpikePlacerAngle = this.nearestSpikePlacerAngle),
        (this.nearestSpikePlacerAngle = null),
        (this.dangerousEnemies.length = 0),
        (this.nearestTrap = null),
        (this.nearestCollider = null),
        (this.nearestEnemySpikeCollider = null),
        (this.spikeCollider = null),
        (this.enemySpikeCollider = null),
        (this.nearestTurretEntity = null),
        (this.detectedEnemy = !1),
        (this.dangerWithoutSoldier = !1),
        (this.detectedDangerEnemy = !1),
        (this.previousTrappedEnemy = this.nearestTrappedEnemy),
        (this.nearestTrappedEnemy = null),
        (this.nearestPlayerObject = null),
        (this.nearestObject = null),
        (this.secondNearestPlayerObject = null),
        (this.nearestEnemyObject = null),
        (this.secondNearestEnemyObject = null),
        (this.nearestSpike = null),
        (this.enemyCanPlaceSpike = !1),
        (this.possibleToKnockback = !1),
        (this.velocityTickThreat = !1),
        (this.potentialSpikeKnockbackDamage = 0),
        (this.potentialSpikeDamage = 0),
        (this.potentialDamage = 0),
        (this.detectedDanger = !1),
        (this.reverseInsta = !1),
        (this.rangedBowInsta = !1),
        (this.spikeSyncThreat = !1),
        (this.nearestEnemyPush = null),
        (this.nearestPushSpike = null),
        (this.nearestLowHPObjectPrev = this.nearestLowHPObject),
        (this.nearestLowHPObject = null),
        (this.nearestSyncEnemy = null),
        (this.primaryDamage = 0));
    }
    get wasTrappedEnemy() {
      let enemy = this.previousTrappedEnemy;
      if (enemy !== null && this.nearestTrappedEnemy === null) {
        return enemy;
      }
      return null;
    }
    get nearestPlaceSpikeAngle() {
      let prevAngle = this.prevNearestSpikePlacerAngle,
        currAngle = this.nearestSpikePlacerAngle;
      if (prevAngle === null && currAngle !== null) {
        return currAngle;
      }
      return null;
    }
    get nearestEnemy() {
      return this._nearestEnemy[0];
    }
    get nearestAnimal() {
      return this._nearestEnemy[1];
    }
    get canSpikeSync() {
      return (
        this.nearestPlaceSpikeAngle !== null &&
        this.client.ObjectManager.isDestroyedObject()
      );
    }
    isNear(enemy, nearest, owner = this.client.myPlayer) {
      if (nearest === null || enemy === nearest) {
        return !0;
      }
      let a0 = owner.pos.current,
        distance1 = a0.distanceDefault(enemy.pos.current),
        distance2 = a0.distanceDefault(nearest.pos.current);
      return distance1 < distance2;
    }
    get nearestEntity() {
      let target1 = this.nearestEnemy,
        target2 = this.nearestAnimal;
      if (target1 === null) {
        return target2;
      }
      return this.isNear(target1, target2) ? target1 : target2;
    }
    instaThreat() {
      return (
        this.velocityTickThreat ||
        this.reverseInsta ||
        this.rangedBowInsta ||
        this.primaryDamage + this.potentialSpikeKnockbackDamage >= 100
      );
    }
    shouldIgnoreModule() {
      return (
        this.instaThreat() || this.detectedDangerEnemy || this.spikeSyncThreat
      );
    }
    nearestEnemyInRangeOf(range, target) {
      let enemy = target || this.nearestEnemy;
      return (
        enemy !== null && this.client.myPlayer.collidingEntity(enemy, range)
      );
    }
    handleDanger(enemy) {
      let danger = enemy.canPossiblyInstakill();
      if (
        ((enemy.prevDanger = enemy.danger),
          (enemy.danger = danger),
          enemy.canPlaceSpikeObject)
      ) {
        this.potentialSpikeDamage = Math.max(
          this.potentialSpikeDamage,
          enemy.spikeDamage,
        );
      }
      if (
        ((this.potentialDamage += enemy.potentialDamage),
          (this.primaryDamage = Math.max(
            enemy.primaryDamage,
            this.primaryDamage,
          )),
          enemy.prevDanger !== enemy.danger && enemy.danger >= 2)
      ) {
        this.detectedDanger = !0;
      }
      if (enemy.velocityTicking) {
        this.velocityTickThreat = !0;
      }
      if (enemy.reverseInsta) {
        this.reverseInsta = !0;
      }
      if (enemy.rangedBowInsta) {
        this.rangedBowInsta = !0;
      }
      if (enemy.spikeSyncThreat) {
        this.spikeSyncThreat = !0;
      }
    }
    checkCollision(target, isOwner = !1) {
      ((target.isTrapped = !1),
        (target.trappedInPrev = target.trappedIn),
        (target.trappedIn = null));
      let {
        ObjectManager: ObjectManager,
        PlayerManager: PlayerManager,
        myPlayer: myPlayer,
        ModuleHandler: ModuleHandler,
      } = this.client,
        pos1 = myPlayer.pos.current,
        pos2 = target.pos.current,
        distanceToTarget = pos1.distance(pos2),
        angleToTarget = pos1.angle(pos2);
      ObjectManager.grid2D.query(
        target.pos.current.x,
        target.pos.current.y,
        3,
        (id) => {
          let object = ObjectManager.objects.get(id),
            pos3 = object.pos.current,
            isPlayerObject = object instanceof PlayerObject,
            isCactus = !isPlayerObject && object.isCactus,
            isSpike = isPlayerObject && object.itemGroup === 2,
            isEnemyObject =
              !isPlayerObject ||
              PlayerManager.isEnemyByID(object.ownerID, target),
            isEnemyObjectToMyPlayer =
              !isPlayerObject ||
              PlayerManager.isEnemyByID(object.ownerID, myPlayer),
            collidingObject = target.collidingObject(object, 1),
            collidingCurrent = target.collidingObject(object, 1, 1);
          if (isPlayerObject && !isEnemyObject) {
            object.wasTeammate = !0;
          }
          if (isPlayerObject && isEnemyObject && object.type === 15) {
            if (collidingObject) {
              if (!isOwner) {
                if (this.isNear(target, this.nearestTrappedEnemy)) {
                  this.nearestTrappedEnemy = target;
                }
                if (
                  !isEnemyObjectToMyPlayer &&
                  this.isNear(target, this.nearestEnemyPush)
                ) {
                  this.nearestEnemyPush = target;
                }
              }
              if (((target.isTrapped = !0), target.hatID === 40)) {
                target.usesTank = !0;
              }
              if (this.isNear(object, target.trappedIn)) {
                target.trappedIn = object;
              }
              if (isOwner && this.isNear(object, this.nearestTrap)) {
                this.nearestTrap = object;
              }
            }
            if (
              collidingCurrent ||
              (!object.seenPlacement && !object.wasTeammate)
            ) {
              object.trapActivated = !0;
            }
          }
          if (
            isOwner &&
            isPlayerObject &&
            object.type === 22 &&
            collidingCurrent
          ) {
            (myPlayer.teleportPos.setVec(pos1), (myPlayer.teleported = !0));
          }
          if (isPlayerObject && object.isDestroyable) {
            if (object.destroyingTick !== ModuleHandler.tickCount) {
              ((object.canBeDestroyed = !1),
                (object.tempHealth = object.health));
            }
            let damage = target.getMaxBuildingDamage(object, !0),
              canSee =
                !isEnemyObject ||
                object.type !== 15 ||
                (isEnemyObject && object.type === 15 && object.trapActivated);
            if (damage !== null && canSee) {
              if (
                ((object.destroyingTick = ModuleHandler.tickCount),
                  (object.tempHealth -= damage),
                  object.tempHealth <= 0)
              ) {
                object.canBeDestroyed = !0;
              }
            }
          }
          if (isOwner) {
            if (isEnemyObject && isPlayerObject && object.isDestroyable) {
              if (
                object.type === 15 ||
                object.type === 16 ||
                object.itemGroup === 2
              ) {
                if (this.isNear(object, this.nearestEnemyObject)) {
                  ((this.secondNearestEnemyObject = this.nearestEnemyObject),
                    (this.nearestEnemyObject = object));
                }
                if (
                  object !== this.nearestEnemyObject &&
                  this.isNear(object, this.secondNearestEnemyObject)
                ) {
                  this.secondNearestEnemyObject = object;
                }
              }
              if (
                object.itemGroup === 2 &&
                this.isNear(object, this.nearestSpike)
              ) {
                this.nearestSpike = object;
              }
            }
            if (this.isNear(object, this.nearestObject)) {
              this.nearestObject = object;
            }
            if (isPlayerObject && object.isDestroyable) {
              if (this.isNear(object, this.nearestPlayerObject)) {
                ((this.secondNearestPlayerObject = this.nearestPlayerObject),
                  (this.nearestPlayerObject = object));
              }
              if (
                object !== this.nearestPlayerObject &&
                this.isNear(object, this.secondNearestPlayerObject)
              ) {
                this.secondNearestPlayerObject = object;
              }
            }
            if (
              !this.willCollideSpike &&
              isEnemyObject &&
              (isSpike || isCactus) &&
              target.collidingObject(object, 70)
            ) {
              this.willCollideSpike = !0;
            }
            if (
              isEnemyObject &&
              (isSpike || isCactus) &&
              target.colliding(
                object,
                target.collisionScale + object.collisionScale + 1,
              )
            ) {
              ((this.collidingSpike = !0),
                (this.potentialSpikeDamage = Math.max(
                  this.potentialSpikeDamage,
                  object.getDamage(),
                )));
            }
            let isAdditional = isPlayerObject && object.type === 16;
            if (
              isEnemyObject &&
              (isSpike || isCactus || isAdditional) &&
              target.collidingObject(object, 150)
            ) {
              if (this.isNear(object, this.nearestCollider)) {
                ((this.secondNearestCollider = this.nearestCollider),
                  (this.nearestCollider = object));
              }
              if (
                object !== this.nearestCollider &&
                this.isNear(object, this.secondNearestCollider)
              ) {
                this.secondNearestCollider = object;
              }
            }
          } else {
            let { primary: primary, secondary: secondary } = myPlayer.weapon;
            if (
              isPlayerObject &&
              object.isDestroyable &&
              secondary === 10 &&
              primary !== null &&
              primary !== 8
            ) {
              let damage = myPlayer.getBuildingDamage(secondary, !0),
                primaryRange =
                  DataHandler_default.getWeapon(primary).range +
                  target.hitScale,
                secondaryRange =
                  DataHandler_default.getWeapon(secondary).range +
                  object.hitScale;
              if (
                myPlayer.collidingSimple(target, primaryRange) &&
                myPlayer.collidingSimple(object, secondaryRange) &&
                object.health <= damage
              ) {
                let itemType = 4,
                  spikeID = myPlayer.getItemByType(itemType),
                  placeLength = myPlayer.getItemPlaceScale(spikeID),
                  spikeScale = Items[spikeID].scale,
                  spikePos = pos1.addDirection(angleToTarget, placeLength),
                  distance = pos2.distance(spikePos),
                  range = target.collisionScale + spikeScale;
                if (
                  distance <= range &&
                  this.isNear(object, this.nearestLowHPObject)
                ) {
                  ((this.nearestLowHPObject = object),
                    (this.nearestSyncEnemy = target));
                }
              }
            }
            if (
              isEnemyObjectToMyPlayer &&
              (isSpike || isCactus) &&
              !myPlayer.isTrapped
            ) {
              let KBDistance = target.getActualMaxKnockback(myPlayer),
                spikeScale = object.collisionScale + myPlayer.collisionScale,
                angleToEnemy = pos2.angle(pos1),
                angleToSpike = pos2.angle(pos3),
                distanceToSpike1 = pos2.distance(pos3),
                offset = Math.asin((2 * spikeScale) / (2 * distanceToSpike1)),
                intersecting =
                  getAngleDist(angleToEnemy, angleToSpike) <= offset,
                overlapping = distanceToTarget <= distanceToSpike1,
                inRange2 =
                  KBDistance !== 0 &&
                  myPlayer.collidingObject(object, KBDistance);
              if (intersecting && overlapping && inRange2) {
                ((this.possibleToKnockback = !0),
                  (this.potentialSpikeKnockbackDamage = Math.max(
                    this.potentialSpikeKnockbackDamage,
                    object.getDamage(),
                  )));
              }
            }
            if (
              isEnemyObject &&
              (isSpike || isCactus) &&
              target.collidingObject(object) &&
              this.isNear(target, this.enemySpikeCollider)
            ) {
              this.enemySpikeCollider = target;
            }
            if (
              isEnemyObject &&
              (isSpike || isCactus) &&
              this.isNear(target, this.nearestEnemySpikeCollider)
            ) {
              let KBDistance = myPlayer.getActualMaxKnockback(target),
                spikeScale =
                  object.collisionScale + target.collisionScale * 1.5,
                angleToEnemy = pos1.angle(pos2),
                angleToSpike = pos1.angle(pos3),
                distanceToSpike1 = pos1.distance(pos3),
                offset = Math.asin((2 * spikeScale) / (2 * distanceToSpike1)),
                intersecting =
                  getAngleDist(angleToEnemy, angleToSpike) <= offset,
                overlapping = distanceToTarget <= distanceToSpike1,
                inRange2 =
                  KBDistance !== 0 &&
                  target.collidingObject(object, KBDistance);
              if (intersecting && overlapping && inRange2) {
                if (this.spikeCollider === null) {
                  ((this.nearestEnemySpikeCollider = target),
                    (this.spikeCollider = object));
                } else {
                  let pos4 = this.spikeCollider.pos.current,
                    angle1 = pos2.angle(pos3),
                    angle2 = pos1.angle(pos3),
                    angle3 = pos2.angle(pos4),
                    angle4 = pos1.angle(pos4),
                    angleDist1 = getAngleDist(angle1, angle2),
                    angleDist2 = getAngleDist(angle3, angle4);
                  if (angleDist1 < angleDist2) {
                    ((this.nearestEnemySpikeCollider = target),
                      (this.spikeCollider = object));
                  }
                }
              }
            }
          }
        },
      );
    }
    handleNearest(type, enemy) {
      let { myPlayer: myPlayer } = this.client;
      if (
        myPlayer.getMaxWeaponDamage(myPlayer.weapon.primary, !1) >=
        enemy.currentHealth &&
        this.isNear(enemy, this.nearestLowEntity)
      ) {
        this.nearestLowEntity = enemy;
      }
      if (this.isNear(enemy, this._nearestEnemy[type])) {
        if (
          ((this._nearestEnemy[type] = enemy),
            enemy.canUseTurret &&
            this.client.myPlayer.collidingSimple(enemy, 700))
        ) {
          this.nearestTurretEntity = enemy;
        }
      }
    }
    handleNearestDangerAnimal(animal) {
      let { myPlayer: myPlayer } = this.client;
      if (!animal.isDanger) {
        return;
      }
      if (!myPlayer.collidingEntity(animal, animal.collisionRange)) {
        return;
      }
      if (!this.isNear(animal, this.nearestDangerAnimal)) {
        return;
      }
      this.nearestDangerAnimal = animal;
    }
    handleAnimal(animal) {
      (this.handleNearest(1, animal), this.handleNearestDangerAnimal(animal));
    }
    attemptSpikePlacement() {
      let {
        ModuleHandler: ModuleHandler,
        myPlayer: myPlayer,
        EnemyManager: EnemyManager2,
      } = this.client,
        placementAngles = this.nearestSpikePlacerAngle;
      if (placementAngles === null) {
        return;
      }
      let itemType = 4,
        target = EnemyManager2.nearestTrappedEnemy || EnemyManager2.nearestEnemy,
        itemID = myPlayer.getItemByType(itemType),
        placeLength = myPlayer.getItemPlaceScale(itemID);
      if (target !== null) {
        let ObjectManager2 = this.client.ObjectManager,
          PlayerManager2 = this.client.PlayerManager,
          spikeScale = Items[itemID].scale,
          pos0 = myPlayer.pos.current,
          targetFuture = target.pos.future || target.pos.current;
        placementAngles = [...placementAngles].sort((a, b) => {
          let posA = pos0.addDirection(a, placeLength),
            posB = pos0.addDirection(b, placeLength),
            scoreA = 0,
            scoreB = 0;
          scoreA -= posA.distance(target.pos.current) * 0.02;
          scoreB -= posB.distance(target.pos.current) * 0.02;
          scoreA -= posA.distance(targetFuture) * 0.015;
          scoreB -= posB.distance(targetFuture) * 0.015;
          if (target.trappedIn !== null) {
            let trapPos = target.trappedIn.pos.current;
            scoreA -= posA.distance(trapPos) * 0.01;
            scoreB -= posB.distance(trapPos) * 0.01;
          }
          for (let [posCandidate, ref] of [[posA, "A"], [posB, "B"]]) {
            let kbAngle = posCandidate.angle(target.pos.current),
              kbPos = target.pos.current.addDirection(kbAngle + Math.PI, 60);
            ObjectManager2.grid2D.query(kbPos.x, kbPos.y, 1, (objID) => {
              let obj = ObjectManager2.objects.get(objID);
              if (obj instanceof PlayerObject && obj.itemGroup === 2
                && !PlayerManager2.isEnemyByID(obj.ownerID, target)
                && kbPos.distance(obj.pos.current) <= obj.collisionScale + target.collisionScale) {
                if (ref === "A") scoreA += 6;
                else scoreB += 6;
              }
            });
            let escapeAngle = target.pos.current.angle(pos0),
              placementAngleFromEnemy = target.pos.current.angle(posCandidate),
              escapeBlock = Math.PI - getAngleDist(escapeAngle, placementAngleFromEnemy);
            if (ref === "A") scoreA += escapeBlock;
            else scoreB += escapeBlock;
          }
          return scoreB - scoreA;
        });
      }
      placementAngles = placementAngles.slice(0, 2);
      for (let angle of placementAngles) {
        ModuleHandler.place(itemType, angle);
      }
      ((ModuleHandler.placedOnce = !0),
        (ModuleHandler.placeAngles[0] = itemType),
        (ModuleHandler.placeAngles[1] = placementAngles));
    }
    handleEnemies(enemies) {
      this.reset();
      let {
        myPlayer: myPlayer,
        ObjectManager: ObjectManager,
        PlayerManager: PlayerManager,
      } = this.client;
      this.checkCollision(myPlayer, !0);
      for (let i = 0, len = enemies.length; i < len; i++) {
        let enemy = enemies[i];
        (this.checkCollision(enemy),
          this.handleDanger(enemy),
          this.handleNearest(0, enemy));
      }
      if (myPlayer.isBullTickTime()) {
        this.potentialDamage += 5;
      }
      this.potentialDamage += this.client.ProjectileManager.totalDamage;
      let actualSpikeDamage = Math.max(
        this.potentialSpikeDamage,
        this.potentialSpikeKnockbackDamage,
      );
      this.potentialSpikeDamage = actualSpikeDamage;
      let potentialDamage = this.potentialDamage + actualSpikeDamage,
        soldierDefense = Hats[6].dmgMult,
        soldierMult = myPlayer.hatID === 6 ? soldierDefense : 1;
      if (potentialDamage * soldierDefense >= myPlayer.currentHealth) {
        this.detectedDangerEnemy = !0;
      } else if (potentialDamage * soldierMult >= myPlayer.currentHealth) {
        this.detectedEnemy = !0;
      }
      if (potentialDamage >= myPlayer.currentHealth) {
        this.dangerWithoutSoldier = !0;
      }
      let nearest = this.nearestEnemy;
      if (nearest !== null) {
        let pos1 = myPlayer.pos.current,
          pos2 = nearest.pos.current,
          angleToEnemy = pos1.angle(pos2),
          itemType = 4,
          spikeID = myPlayer.getItemByType(itemType),
          placeLength = myPlayer.getItemPlaceScale(spikeID),
          angles = ObjectManager.getBestPlacementAngles({
            position: pos1,
            id: spikeID,
            targetAngle: angleToEnemy,
            ignoreID: null,
            preplace: !1,
            reduce: !1,
            fill: !1,
          }),
          spikeScale = Items[spikeID].scale,
          possibleAngles = angles.filter((angle) => {
            let spikePos = pos1.addDirection(angle, placeLength),
              distance = pos2.distance(spikePos),
              range = nearest.collisionScale + spikeScale;
            return distance <= range;
          });
        if (possibleAngles.length !== 0) {
          this.nearestSpikePlacerAngle = possibleAngles;
        }
        if (Settings_default._autoSync) {
          for (let i = 0; i < PlayerManager.players.length; i++) {
            let player = PlayerManager.players[i];
            if (myPlayer.isMyPlayerByID(player.id)) {
              continue;
            }
            if (
              PlayerManager.isEnemyByID(nearest.id, player) &&
              this.isNear(player, this.nearestEnemyToNearestEnemy, nearest)
            ) {
              this.nearestEnemyToNearestEnemy = player;
            }
          }
        }
      }
      let nearestEnemyPush = this.nearestEnemyPush;
      if (nearestEnemyPush !== null && myPlayer.trappedIn === null) {
        let trappedIn = nearestEnemyPush.trappedIn,
          pos0 = trappedIn.pos.current;
        ObjectManager.grid2D.query(pos0.x, pos0.y, 2, (id) => {
          let object = ObjectManager.objects.get(id);
          if (object === trappedIn) {
            return;
          }
          let isPlayerObject = object instanceof PlayerObject,
            isCactus = !isPlayerObject && object.isCactus,
            isSpike = isPlayerObject && object.itemGroup === 2;
          isPlayerObject && object.type;
          if (
            (!isPlayerObject ||
              PlayerManager.isEnemyByID(object.ownerID, nearestEnemyPush)) &&
            (isCactus || isSpike) &&
            this.isNear(object, this.nearestPushSpike, nearestEnemyPush)
          ) {
            let pos1 = object.pos.current,
              distance = pos0.distance(pos1),
              range =
                object.collisionScale +
                trappedIn.collisionScale +
                nearestEnemyPush.collisionScale * 2;
            if (distance <= range) {
              this.nearestPushSpike = object;
            }
          }
        });
      }
      if (this.client.isOwner) {
        (GameUI_default.updateSpikeDamage(actualSpikeDamage),
          GameUI_default.updatePotentialDamage(
            `${this.potentialDamage}, ${this.primaryDamage}`,
          ),
          GameUI_default.updateDangerState(
            `${this.detectedDangerEnemy}, ${this.detectedEnemy}, ${this.dangerWithoutSoldier}, ${this.rangedBowInsta}`,
          ),
          GameUI_default.updateCollideSpike(this.collidingSpike));
      }
    }
  }

  const EnemyManager_default = EnemyManager;

  class LeaderboardManager {
    client;
    list = new Set();
    constructor(client) {
      this.client = client;
    }
    updatePlayer(id, nickname, gold) {
      let owner =
        this.client.PlayerManager.playerData.get(id) ||
        this.client.PlayerManager.createPlayer({
          id: id,
          nickname: nickname,
        });
      this.list.add(owner);
    }
    update(data) {
      this.list.clear();
      for (let i = 0; i < data.length; i += 3) {
        let id = data[i + 0],
          nickname = data[i + 1],
          gold = data[i + 2];
        this.updatePlayer(id, nickname, gold);
      }
    }
  }

  const LeaderboardManager_default = LeaderboardManager;

  const HatPredictor = new (class {
    transitions = new Map();
    train(history) {
      this.transitions.clear();
      for (let i = 0; i < history.length - 1; i++) {
        let currentHat = history[i],
          nextHat = history[i + 1];
        if (!this.transitions.has(currentHat)) {
          this.transitions.set(currentHat, new Map());
        }
        let nextMap = this.transitions.get(currentHat);
        nextMap.set(nextHat, (nextMap.get(nextHat) || 0) + 1);
      }
    }
    predict(currentHat) {
      if (!this.transitions.has(currentHat)) {
        return null;
      }
      let nextMap = this.transitions.get(currentHat),
        maxCount = 0,
        predictedHat = null;
      for (let [hat, count] of nextMap) {
        if (count > maxCount) {
          ((maxCount = count), (predictedHat = hat));
        }
      }
      return predictedHat;
    }
  })(),
    HatPredictor_default = HatPredictor;

  class Player extends Entity_default {
    currentItem = -1;
    clanName = null;
    isLeader = !1;
    prevNickname = "";
    nickname = "unknown";
    skinID = 0;
    scale = 35;
    storeData = [0, 0];
    hatID = 0;
    prevHat = 0;
    accessoryID = 0;
    usesTurret = !1;
    previousHealth = 100;
    currentHealth = 100;
    tempHealth = 100;
    maxHealth = 100;
    primaryReloadTickCount = 0;
    nextDamageTick = 0;
    globalInventory = {};
    weapon = {};
    oldWeapon = [0, null];
    variant = {};
    reload = [{}, {}, {}];
    objects = new Set();
    newlyCreated = !0;
    usingBoost = !1;
    isTrapped = !1;
    usesTank = !1;
    trappedIn = null;
    trappedInPrev = null;
    isFullyUpgraded = !1;
    potentialDamage = 0;
    primaryDamage = 0;
    spikeDamage = 0;
    dangerList = [];
    danger = 0;
    prevDanger = 0;
    hatHistory = [];
    futureHat = 0;
    shameActive = !1;
    shameTimer = 0;
    shameCount = 0;
    receivedDamage = null;
    bullTick = 0;
    poisonCount = 0;
    isDmgOverTime = !1;
    tickCount = 0;
    damageTick = 0;
    canPlaceSpikePrev = !1;
    canPlaceSpike = !1;
    velocityTicking = !1;
    reverseInsta = !1;
    rangedBowInsta = !1;
    spikeSyncThreat = !1;
    tickDamage = 100;
    stackedDamage = 0;
    damages = [];
    prevSeenBefore = !1;
    seenBefore = !1;
    isPlayer = !0;
    lastAttacked = 0;
    constructor(client) {
      super(client);
    }
    justAppeared() {
      return !this.prevSeenBefore && this.seenBefore;
    }
    wasTrapped() {
      return this.trappedIn === null && this.trappedInPrev !== null;
    }
    addFound(projectile) {
      ((projectile.owner = this),
        this.client.ProjectileManager.foundProjectile(projectile));
    }
    resetReload() {
      let { primary: primary, secondary: secondary } = this.weapon,
        primarySpeed = this.getWeaponSpeed(primary),
        secondarySpeed = this.getWeaponSpeed(secondary),
        reload = this.reload;
      ((reload[0].previous = primarySpeed),
        (reload[0].current = primarySpeed),
        (reload[0].max = primarySpeed),
        (reload[1].previous = secondarySpeed),
        (reload[1].current = secondarySpeed),
        (reload[1].max = secondarySpeed),
        (reload[2].previous = 23),
        (reload[2].current = 23),
        (reload[2].max = 23));
    }
    resetGlobalInventory() {
      ((this.globalInventory[0] = null),
        (this.globalInventory[1] = null),
        (this.globalInventory[2] = null),
        (this.globalInventory[3] = null),
        (this.globalInventory[4] = null),
        (this.globalInventory[5] = null),
        (this.globalInventory[6] = null),
        (this.globalInventory[7] = null),
        (this.globalInventory[8] = null),
        (this.globalInventory[9] = null));
    }
    init() {
      ((this.weapon.current = 0),
        (this.weapon.oldCurrent = 0),
        (this.weapon.primary = null),
        (this.weapon.secondary = null),
        (this.oldWeapon[0] = null),
        (this.oldWeapon[1] = null),
        (this.variant.current = 0),
        (this.variant.primary = 0),
        (this.variant.secondary = 0),
        this.resetReload(),
        this.resetGlobalInventory(),
        (this.newlyCreated = !0),
        (this.usingBoost = !1),
        (this.isFullyUpgraded = !1));
    }
    get canUseTurret() {
      return this.hatID !== 22;
    }
    get canPlaceSpikeObject() {
      return (
        (!this.canPlaceSpikePrev && this.canPlaceSpike) ||
        (this.speed >= 10 && this.canPlaceSpike)
      );
    }
    isBullTickTime(adjust = 0) {
      return (this.tickCount - this.bullTick - adjust) % 9 === 0;
    }
    update(
      id,
      x,
      y,
      angle,
      currentItem,
      currentWeapon,
      weaponVariant,
      clanName,
      isLeader,
      hatID,
      accessoryID,
    ) {
      if (
        ((this.prevSeenBefore = this.seenBefore),
          (this.seenBefore = !0),
          this.justAppeared())
      ) {
        this.resetReload();
      }
      ((this.tickCount += 1),
        (this.id = id),
        this.pos.previous.setVec(this.pos.current),
        this.pos.current.setXY(x, y),
        this.setFuturePosition(),
        (this.angle = angle),
        (this.currentItem = currentItem),
        (this.weapon.oldCurrent = this.weapon.current));
      let weaponType = DataHandler_default.getWeapon(
        this.weapon.current,
      ).itemType;
      if (
        ((this.oldWeapon[weaponType] = this.weapon.current),
          (this.weapon.current = currentWeapon),
          (this.variant.current = weaponVariant),
          (this.clanName = clanName),
          (this.isLeader = !!isLeader),
          (this.prevHat = this.hatID),
          (this.hatID = hatID),
          this.prevHat === 7 && hatID === 53)
      ) {
        this.usesTurret = !0;
      }
      if ((this.hatHistory.push(hatID), this.hatHistory.length > 4)) {
        this.hatHistory.shift();
      }
      if (
        (HatPredictor_default.train(this.hatHistory),
          (this.futureHat = HatPredictor_default.predict(hatID)),
          this.usesTurret && hatID === 7)
      ) {
        this.futureHat = 53;
      }
      if (
        ((this.accessoryID = accessoryID),
          (this.storeData[0] = hatID),
          (this.storeData[1] = accessoryID),
          (this.newlyCreated = !1),
          (this.potentialDamage = 0),
          (this.primaryDamage = 0),
          (this.spikeDamage = 0),
          (this.canPlaceSpikePrev = this.canPlaceSpike),
          (this.canPlaceSpike = !1),
          (this.velocityTicking = !1),
          (this.reverseInsta = !1),
          (this.rangedBowInsta = !1),
          (this.spikeSyncThreat = !1),
          this.predictItems(),
          this.predictWeapons(),
          this.updateReloads(),
          (this.isDmgOverTime = !1),
          this.hatID === 45 && !this.shameActive)
      ) {
        ((this.shameActive = !0), (this.shameTimer = 0), (this.shameCount = 8));
      }
      let { PlayerManager: PlayerManager, myPlayer: myPlayer } = this.client;
      if (
        ((this.shameTimer += PlayerManager.step),
          this.shameTimer >= 3e4 && this.shameActive)
      ) {
        ((this.shameActive = !1), (this.shameTimer = 0), (this.shameCount = 0));
      }
      if (this.isBullTickTime()) {
        if (this.shameCount > 0) {
          this.futureHat = 7;
        }
        this.poisonCount = Math.max(this.poisonCount - 1, 0);
      }
      let reload = this.reload;
      ((reload[0].previous = reload[0].current),
        (reload[1].previous = reload[1].current),
        (reload[2].previous = reload[2].current));
    }
    updateHealth(health) {
      if (
        ((this.previousHealth = this.currentHealth),
          (this.currentHealth = health),
          (this.tempHealth = health),
          this.shameActive)
      ) {
        return;
      }
      let { myPlayer: myPlayer, PlayerManager: PlayerManager } = this.client,
        isEnemy = myPlayer.isEnemyByID(this.id),
        { currentHealth: currentHealth, previousHealth: previousHealth } = this,
        difference = Math.abs(currentHealth - previousHealth);
      if (this.currentHealth < this.previousHealth) {
        if (
          ((this.receivedDamage = Date.now()),
            this.damageTick !== this.tickCount + 1)
        ) {
          ((this.tickDamage = 0),
            (this.stackedDamage = 0),
            (this.damages.length = 0));
        }
        if (
          ((this.tickDamage += difference),
            (this.damageTick = this.tickCount + 1),
            isEnemy)
        ) {
          ((PlayerManager.lastEnemyReceivedDamage[0] = this.id),
            (PlayerManager.lastEnemyReceivedDamage[1] =
              Math.round(difference)));
        }
      } else if (this.receivedDamage !== null) {
        let step = Date.now() - this.receivedDamage;
        if (((this.receivedDamage = null), step <= 120)) {
          this.shameCount += 1;
        } else {
          this.shameCount -= 2;
        }
        this.shameCount = clamp(this.shameCount, 0, 7);
      }
      let isDmgOverTime =
        (difference === 5 || difference === 2 || difference === 4) &&
        currentHealth < previousHealth;
      if (((this.isDmgOverTime = isDmgOverTime), isDmgOverTime)) {
        this.bullTick = this.tickCount;
      }
    }
    predictItems() {
      if (this.currentItem === -1) {
        return;
      }
      let item = Items[this.currentItem];
      this.globalInventory[item.itemType] = this.currentItem;
    }
    increaseReload(reload) {
      if (
        ((reload.previous = reload.current),
          (reload.current += 1),
          reload.current > reload.max)
      ) {
        reload.current = reload.max;
      }
    }
    updateMaxReload(reload, weaponID) {
      let speed = this.getWeaponSpeed(weaponID);
      ((reload.current = speed), (reload.max = speed));
    }
    resetCurrentReload(reload) {
      reload.current = 0;
    }
    updateTurretReload() {
      let reload = this.reload[2];
      if ((this.increaseReload(reload), this.hatID !== 53)) {
        return;
      }
      let { ProjectileManager: ProjectileManager } = this.client,
        speed = Projectiles[1].speed,
        list = ProjectileManager.projectiles.get(speed);
      if (list === void 0) {
        return;
      }
      let current = this.pos.current;
      for (let i = 0; i < list.length; i++) {
        let projectile = list[i];
        if (current.distance(projectile.pos.current) < 5) {
          (this.addFound(projectile),
            this.resetCurrentReload(reload),
            removeFast(list, i));
          break;
        }
      }
    }
    updateReloads() {
      if ((this.updateTurretReload(), this.currentItem !== -1)) {
        return;
      }
      let weapon = DataHandler_default.getWeapon(this.weapon.current),
        reload = this.reload[weapon.itemType];
      if ((this.increaseReload(reload), "projectile" in weapon)) {
        let { ProjectileManager: ProjectileManager } = this.client,
          speedMult = this.getWeaponSpeedMult(),
          type = weapon.projectile,
          speed = Projectiles[type].speed * speedMult,
          list = ProjectileManager.projectiles.get(speed);
        if (list === void 0) {
          return;
        }
        let current = this.pos.current;
        for (let i = 0; i < list.length; i++) {
          let projectile = list[i];
          if (
            current.distance(projectile.pos.current) < 5 &&
            this.angle === projectile.angle
          ) {
            (this.addFound(projectile),
              this.updateMaxReload(reload, weapon.id),
              this.resetCurrentReload(reload),
              removeFast(list, i));
            break;
          }
        }
      }
    }
    handleObjectPlacement(object) {
      this.objects.add(object);
      let { myPlayer: myPlayer, ObjectManager: ObjectManager } = this.client,
        item = Items[object.type];
      if (object.seenPlacement) {
        if (object.type === 17) {
          ObjectManager.resetTurret(object.id);
        } else if (object.type === 16 && !this.newlyCreated) {
          this.usingBoost = !0;
        }
        this.updateInventory(object.type);
      }
      if (myPlayer.isMyPlayerByID(this.id) && item.itemType === 5) {
        myPlayer.totalGoldAmount += item.pps;
      }
    }
    handleObjectDeletion(object) {
      this.objects.delete(object);
      let { myPlayer: myPlayer } = this.client,
        item = Items[object.type];
      if (myPlayer.isMyPlayerByID(this.id) && item.itemType === 5) {
        myPlayer.totalGoldAmount -= item.pps;
      }
    }
    updateInventory(type) {
      let item = Items[type],
        inventoryID = this.globalInventory[item.itemType];
      if (inventoryID === null || item.age > Items[inventoryID].age) {
        this.globalInventory[item.itemType] = item.id;
      }
    }
    detectFullUpgrade() {
      let inventory = this.globalInventory,
        primary = inventory[0],
        secondary = inventory[1],
        spike = inventory[4];
      if (primary && secondary) {
        if (
          "isUpgrade" in DataHandler_default.getWeapon(primary) &&
          "isUpgrade" in DataHandler_default.getWeapon(secondary)
        ) {
          return !0;
        }
      }
      return (
        (primary && DataHandler_default.getWeapon(primary).age === 8) ||
        (secondary && DataHandler_default.getWeapon(secondary).age === 9) ||
        (spike && Items[spike].age === 9) ||
        inventory[5] === 12 ||
        inventory[9] === 20
      );
    }
    predictPrimary(id) {
      if (id === 11) {
        return 4;
      }
      return 5;
    }
    predictSecondary(id) {
      if (id === 0) {
        return null;
      }
      if (id === 2 || id === 4) {
        return 10;
      }
      return 15;
    }
    predictWeapons() {
      let { current: current, oldCurrent: oldCurrent } = this.weapon,
        weapon = DataHandler_default.getWeapon(current),
        type = WeaponTypeString[weapon.itemType],
        reload = this.reload[weapon.itemType],
        oldWeapon = this.oldWeapon[weapon.itemType],
        upgradedWeapon =
          oldWeapon === null ||
          (current !== oldWeapon &&
            weapon.itemType ===
            DataHandler_default.getWeapon(oldWeapon).itemType);
      if (reload.max === -1 || upgradedWeapon) {
        this.updateMaxReload(reload, weapon.id);
      }
      ((this.globalInventory[weapon.itemType] = current),
        (this.variant[type] = this.variant.current));
      let currentType = this.weapon[type];
      if (
        currentType === null ||
        weapon.age > DataHandler_default.getWeapon(currentType).age
      ) {
        this.weapon[type] = current;
      }
      let primary = this.globalInventory[0],
        secondary = this.globalInventory[1],
        notPrimaryUpgrade =
          primary === null ||
          !("isUpgrade" in DataHandler_default.getWeapon(primary)),
        notSecondaryUpgrade =
          secondary === null ||
          !("isUpgrade" in DataHandler_default.getWeapon(secondary));
      if (DataHandler_default.isSecondary(current) && notPrimaryUpgrade) {
        let predicted = this.predictPrimary(current);
        if (
          primary === null ||
          DataHandler_default.getWeapon(predicted).upgradeType ===
          DataHandler_default.getWeapon(primary).upgradeType
        ) {
          this.weapon.primary = predicted;
        }
      } else if (
        DataHandler_default.isPrimary(current) &&
        notSecondaryUpgrade
      ) {
        let predicted = this.predictSecondary(current);
        if (
          predicted === null ||
          secondary === null ||
          DataHandler_default.getWeapon(predicted).upgradeType ===
          DataHandler_default.getWeapon(secondary).upgradeType
        ) {
          this.weapon.secondary = predicted;
        }
      }
      if (
        ((this.isFullyUpgraded = this.detectFullUpgrade()),
          this.isFullyUpgraded)
      ) {
        if (primary !== null) {
          this.weapon.primary = primary;
        }
        if (secondary !== null) {
          this.weapon.secondary = secondary;
        }
      }
      if (this.weapon.primary === void 0) {
        throw Error(
          "Primary is 'undefined', value must be at least 'null' or 'number'",
        );
      }
      if (this.weapon.secondary === void 0) {
        throw Error(
          "Secondary is 'undefined', value must be at least 'null' or 'number'",
        );
      }
    }
    getWeaponVariant(id) {
      let type = DataHandler_default.getWeapon(id || 0).itemType,
        variant = this.variant[WeaponTypeString[type]];
      return {
        current: variant,
        next: Math.min(variant + 1, 3),
      };
    }
    getBuildingDamage(id, isTank = !1) {
      let weapon = DataHandler_default.getWeapon(id),
        variant = WeaponVariants[this.getWeaponVariant(id).current],
        damage = weapon.damage * variant.val;
      if ("sDmg" in weapon) {
        damage *= weapon.sDmg;
      }
      let hat = Hats[isTank ? 40 : this.hatID];
      if ("bDmg" in hat) {
        damage *= hat.bDmg;
      }
      return damage;
    }
    getMaxBuildingDamage(object, isTank = !0) {
      let { primary: primary, secondary: secondary } = this.weapon;
      if (
        DataHandler_default.isMelee(secondary) &&
        secondary === 10 &&
        this.isReloaded(1, 1)
      ) {
        if (
          this.collidingSimple(
            object,
            DataHandler_default.getWeapon(secondary).range + object.hitScale,
          )
        ) {
          return this.getBuildingDamage(secondary, isTank);
        }
      }
      if (DataHandler_default.isMelee(primary) && this.isReloaded(0, 1)) {
        if (
          this.collidingSimple(
            object,
            DataHandler_default.getWeapon(primary).range + object.hitScale,
          )
        ) {
          return this.getBuildingDamage(primary, isTank);
        }
      }
      return null;
    }
    canDealPoison(weaponID) {
      let isRuby = this.getWeaponVariant(weaponID).current === 3,
        hasPlague = this.hatID === 21;
      return {
        isAble: isRuby || hasPlague,
        count: isRuby ? 5 : hasPlague ? 6 : 0,
      };
    }
    getWeaponSpeed(id, hat = this.hatID) {
      if (id === null) {
        return -1;
      }
      let reloadSpeed = hat === 20 ? Hats[hat].atkSpd : 1,
        speed = DataHandler_default.getWeapon(id).speed * reloadSpeed;
      return Math.ceil(speed / this.client.SocketManager.TICK);
    }
    getWeaponSpeedMult() {
      if (this.hatID === 1) {
        return Hats[this.hatID].aMlt;
      }
      return 1;
    }
    getMaxWeaponRange() {
      let { primary: primary, secondary: secondary } = this.weapon,
        primaryRange = DataHandler_default.getWeapon(primary).range;
      if (DataHandler_default.isMelee(secondary)) {
        let range = DataHandler_default.getWeapon(secondary).range;
        if (range > primaryRange) {
          return range;
        }
      }
      return primaryRange;
    }
    getWeaponRange(weaponID) {
      if (weaponID === null) {
        return 0;
      }
      let range = DataHandler_default.getWeapon(weaponID).range;
      if (DataHandler_default.isMelee(weaponID)) {
        return range + this.hitScale;
      }
      return range + this.collisionScale;
    }
    getMaxWeaponDamage(id, lookingShield, addBull = !0) {
      if (DataHandler_default.isMelee(id)) {
        let bull = Hats[7],
          variant = this.getWeaponVariant(id).current,
          damage = DataHandler_default.getWeapon(id).damage;
        if (addBull) {
          damage *= bull.dmgMultO;
        }
        if (((damage *= WeaponVariants[variant].val), lookingShield)) {
          damage *= DataHandler_default.getWeapon(11).shield;
        }
        return damage;
      } else if (DataHandler_default.isShootable(id) && !lookingShield) {
        return DataHandler_default.getProjectile(id).damage;
      }
      return 0;
    }
    getMaxKnockback() {
      let knockback = 60,
        { primary: primary, secondary: secondary } = this.weapon;
      if (primary != null) {
        knockback += DataHandler_default.getWeapon(primary).knockback;
      }
      if (secondary != null) {
        knockback += DataHandler_default.getWeapon(secondary).knockback;
      }
      return knockback;
    }
    getPrimaryKnockback(target) {
      let { primary: primary } = this.weapon;
      if (primary !== null && this.isReloaded(0, 1)) {
        let { range: range, knockback: knockback } =
          DataHandler_default.getWeapon(primary);
        if (this.collidingEntity(target, range)) {
          return knockback;
        }
      }
      return 0;
    }
    getActualMaxKnockback(target) {
      let output = 0,
        { primary: primary, secondary: secondary } = this.weapon,
        hitScale = target.hitScale;
      if (primary !== null && this.isReloaded(0, 1)) {
        let { range: range, knockback: knockback } =
          DataHandler_default.getWeapon(primary);
        if (this.collidingEntity(target, range + hitScale)) {
          output += knockback;
        }
      }
      if (secondary !== null && this.isReloaded(1, 1)) {
        let { range: range, knockback: knockback } =
          DataHandler_default.getWeapon(secondary);
        if (this.collidingEntity(target, range + hitScale)) {
          output += knockback;
        }
      }
      if (this.isReloaded(2, 1)) {
        if (this.collidingEntity(target, 700 + hitScale)) {
          output += 60;
        }
      }
      return output;
    }
    getItemPlaceScale(itemID) {
      let item = Items[itemID];
      return this.scale + item.scale + item.placeOffset;
    }
    isReloaded(type, tick) {
      let reload = this.reload[type].current,
        max = this.reload[type].max - tick;
      return reload >= max;
    }
    atExact(type, tick) {
      let { current: current, max: max } = this.reload[type];
      return current === max - tick;
    }
    isEmptyReload(type) {
      return this.reload[type].current === 0;
    }
    detectSpikeInsta() {
      let { myPlayer: myPlayer, ObjectManager: ObjectManager } = this.client,
        spikeID = this.globalInventory[4] || 9,
        placeLength = this.getItemPlaceScale(spikeID),
        pos1 = this.pos.current,
        pos2 = myPlayer.pos.current,
        angleToMyPlayer = pos1.angle(pos2),
        spike = Items[spikeID],
        range = this.collisionScale + spike.scale,
        straightSpikePos = pos1.addDirection(angleToMyPlayer, placeLength);
      if (pos2.distance(straightSpikePos) > range) {
        return 0;
      }
      myPlayer.trappedIn !== null &&
        myPlayer.trappedIn.canBeDestroyed &&
        myPlayer.trappedIn.id;
      let angles = ObjectManager.getBestPlacementAngles({
        position: pos1,
        id: spikeID,
        targetAngle: angleToMyPlayer,
        ignoreID: null,
        preplace: !1,
        reduce: !1,
        fill: !1,
      });
      for (let angle of angles) {
        let spikePos = pos1.addDirection(angle, placeLength);
        if (pos2.distance(spikePos) <= range) {
          return spike.damage;
        }
      }
      return 0;
    }
    canPossiblyInstakill() {
      let { PlayerManager: PlayerManager, myPlayer: myPlayer } = this.client,
        lookingShield = PlayerManager.lookingShield(myPlayer, this),
        { primary: primary, secondary: secondary } = this.weapon,
        primaryDamage = this.getMaxWeaponDamage(primary, lookingShield),
        secondaryDamage = this.getMaxWeaponDamage(secondary, lookingShield),
        addRange = this.isTrapped ? 20 : 115,
        boostRange = this.usingBoost && !this.isTrapped ? 430 : addRange,
        primaryRange = this.getWeaponRange(primary) + boostRange,
        secondaryRange = this.getWeaponRange(secondary) + addRange,
        turretRange = 700 + addRange,
        primaryReloaded = this.isReloaded(0, 1),
        primaryVariant = this.getWeaponVariant(primary).current,
        isDiamondPolearm = primary === 5 && primaryVariant >= 2,
        collidingPrimary = myPlayer.collidingEntity(this, primaryRange),
        collidingSecondary = myPlayer.collidingEntity(
          this,
          DataHandler_default.isShootable(secondary)
            ? primaryRange
            : secondaryRange,
        ),
        collidingTurret = myPlayer.collidingEntity(this, turretRange),
        spikeSyncDamage = 0,
        includeTurret = !1;
      if (collidingPrimary) {
        if (primaryReloaded) {
          ((this.potentialDamage += primaryDamage),
            (this.primaryDamage = primaryDamage),
            (spikeSyncDamage += primaryDamage));
        }
        includeTurret = !0;
      }
      if (collidingSecondary) {
        if (this.isReloaded(1, 1)) {
          this.potentialDamage += secondaryDamage;
        }
        if (DataHandler_default.isMelee(secondary)) {
          includeTurret = !0;
        }
      }
      if (this.isReloaded(2, 1) && includeTurret && !lookingShield) {
        this.potentialDamage += 25;
      }
      if (
        collidingPrimary &&
        collidingTurret &&
        this.isEmptyReload(2) &&
        primaryReloaded &&
        isDiamondPolearm
      ) {
        this.velocityTicking = !0;
      }
      if (
        collidingPrimary &&
        collidingSecondary &&
        collidingTurret &&
        this.isEmptyReload(1) &&
        this.isEmptyReload(2) &&
        primaryReloaded
      ) {
        this.reverseInsta = !0;
      }
      let pos1 = this.pos.current,
        pos2 = myPlayer.pos.current,
        distance = pos1.distance(pos2),
        angle = pos1.angle(pos2),
        offset = Math.asin((2 * myPlayer.scale) / (2 * distance)),
        lookingAt = getAngleDist(angle, this.angle) <= offset,
        { current: current, oldCurrent: oldCurrent } = this.weapon,
        bowDetect =
          (current === 9 && oldCurrent !== 9) ||
          (current === 12 && oldCurrent === 9) ||
          (current === 15 && oldCurrent === 12);
      if (distance > 300 && lookingAt && bowDetect) {
        this.rangedBowInsta = !0;
      }
      let spikeDamage = this.detectSpikeInsta();
      if (spikeDamage !== 0) {
        if (
          ((this.canPlaceSpike = !0),
            (this.spikeDamage = spikeDamage),
            (spikeSyncDamage += spikeDamage),
            spikeSyncDamage >= 100)
        ) {
          this.spikeSyncThreat = !0;
        }
      }
      let soldierDefense = Hats[6].dmgMult;
      if (this.potentialDamage * soldierDefense >= myPlayer.currentHealth) {
        return 3;
      }
      let soldierMult = myPlayer.hatID === 6 ? soldierDefense : 1;
      if (this.potentialDamage * soldierMult >= myPlayer.currentHealth) {
        return 2;
      }
      return 0;
    }
  }

  const Player_default = Player;

  const resizeEvent = new Event("resize"),
    ZoomHandler = new (class {
      scale = {
        Default: {
          w: 1920,
          h: 1080,
        },
        current: {
          w: 1920,
          h: 1080,
        },
        smooth: {
          w: Hooker_default.linker(1920),
          h: Hooker_default.linker(1080),
        },
      };
      getScale() {
        return (
          Math.max(
            window.innerWidth / this.scale.Default.w,
            window.innerHeight / this.scale.Default.h,
          ) * 1
        );
      }
      tempScale = 1;
      handler(event) {
        if (
          !(event.target instanceof HTMLCanvasElement) ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          isActiveInput()
        ) {
          return;
        }
        let { Default: Default, current: current } = this.scale;
        if (event.deltaY < 0) {
          this.tempScale /= 1.1;
        } else {
          this.tempScale *= 1.1;
        }
        this.tempScale = clamp(this.tempScale, 0.1, 22);
        let zoom = this.tempScale;
        ((current.w = Default.w * zoom), (current.h = Default.h * zoom));
      }
      renderStart = Date.now();
      smoothUpdate() {
        let { current: current, smooth: smooth } = this.scale,
          now = Date.now(),
          delta = now - this.renderStart;
        this.renderStart = now;
        let dt = delta / 1e3,
          blend = 0.4 * (1 - Math.exp(-10 * dt));
        ((smooth.w[0] = lerp(smooth.w[0], current.w, blend)),
          (smooth.h[0] = lerp(smooth.h[0], current.h, blend)),
          window.dispatchEvent(resizeEvent));
      }
    })(),
    ZoomHandler_default = ZoomHandler;

  const renderText = (ctx, text, size = 25, posx = 10, posy = 9) => {
    (ctx.save(),
      (ctx.font = `700 ${size}px sans-serif`),
      (ctx.textAlign = "left"),
      (ctx.textBaseline = "top"),
      ctx.setTransform(1, 0, 0, 1, 0, 0));
    let scale = ZoomHandler_default.getScale();
    (ctx.scale(scale, scale),
      (ctx.fillStyle = "#eaeaea"),
      (ctx.strokeStyle = "#1f2029"),
      (ctx.lineWidth = 8),
      (ctx.globalAlpha = 0.6),
      (ctx.letterSpacing = "6px"),
      (ctx.lineJoin = "round"),
      ctx.strokeText(text, posx, posy),
      ctx.fillText(text, posx, posy),
      ctx.restore());
  },
    Renderer = new (class {
      renderObjects = [];
      totalTimes = [];
      lastLogTime = performance.now();
      preRender() {
        ZoomHandler_default.smoothUpdate();
      }
      postRender() {
        let now = performance.now();
        while (this.totalTimes.length > 0 && this.totalTimes[0] <= now - 1e3) {
          this.totalTimes.shift();
        }
        this.totalTimes.push(now);
        let fps = this.totalTimes.length;
        if (now - this.lastLogTime >= 1e3) {
          (GameUI_default.updateFPS(fps), (this.lastLogTime = now));
        }
        let canvas = document.querySelector("#gameCanvas");
        if (canvas) {
          let mainContext = canvas.getContext("2d");
          mainContext.save();
          mainContext.globalAlpha = 1;
          mainContext.fillStyle = "rgba(0, 0, 70, 0.35)";
          mainContext.fillRect(0, 0, canvas.width, canvas.height);
          if (AB.Menu.nightMode || true) {
            mainContext.globalAlpha = 0.35;
            mainContext.fillStyle = "rgb(0, 0, 100)";
            mainContext.fillRect(0, 0, canvas.width, canvas.height);
          }
          mainContext.restore();
        }
        document.querySelector("#Atlantis-watermark-ui")?.remove();
      }
      mapPreRender(ctx) {
        (ctx.save(), (ctx.globalAlpha = 1));
        let width = ctx.canvas.width,
          height = ctx.canvas.height;
        let { ModuleHandler: ModuleHandler, myPlayer: myPlayer } = client;
        let markSize = 8;
        if (ModuleHandler.followPath) {
          let pos = ModuleHandler.endTarget
            .copy()
            .div(Config_default.mapScale)
            .mult(width);
          ((ctx.fillStyle = "#8f6bff"),
            ctx.beginPath(),
            ctx.arc(pos.x, pos.y, markSize, 0, 2 * Math.PI),
            ctx.fill());
        }
        if (myPlayer.teleported) {
          let pos = myPlayer.teleportPos
            .copy()
            .div(Config_default.mapScale)
            .mult(width);
          ((ctx.fillStyle = "#7f95ff"),
            ctx.beginPath(),
            ctx.arc(pos.x, pos.y, markSize, 0, 2 * Math.PI),
            ctx.fill());
        }
        ctx.fillStyle = Settings_default._notificationTracersColor;
        let notifications = NotificationRenderer_default.notifications;
        for (let notify of notifications) {
          let x = (notify.x / Config_default.mapScale) * width,
            y = (notify.y / Config_default.mapScale) * width;
          (ctx.beginPath(),
            ctx.arc(x, y, markSize * 1.5, 0, 2 * Math.PI),
            ctx.fill());
        }
        ctx.restore();
      }
      drawNorthArrow(ctx, x, y, angle) {
        (ctx.save(),
          (ctx.globalAlpha = 0.7),
          (ctx.fillStyle = "#883131"),
          ctx.translate(x, y),
          ctx.rotate(angle + Math.PI / 2),
          ctx.beginPath(),
          ctx.moveTo(0, -17.5),
          ctx.lineTo(11.666666666666666, 17.5),
          ctx.lineTo(0, 11.666666666666666),
          ctx.lineTo(-11.666666666666666, 17.5),
          ctx.closePath(),
          ctx.fill(),
          ctx.restore());
      }
      rotation = 0;
      arrowPart = (2 * Math.PI) / 3;
      drawTarget(ctx, entity) {
        let len = entity.scale + 30;
        ((this.rotation = (this.rotation + 0.01) % 6.28),
          ctx.save(),
          ctx.translate(-client.myPlayer.offset.x, -client.myPlayer.offset.y),
          ctx.translate(entity.x, entity.y),
          ctx.rotate(this.rotation),
          this.drawNorthArrow(
            ctx,
            len * Math.cos(this.arrowPart * 1),
            len * Math.sin(this.arrowPart * 1),
            -1.04,
          ),
          this.drawNorthArrow(
            ctx,
            len * Math.cos(this.arrowPart * 2),
            len * Math.sin(this.arrowPart * 2),
            1.04,
          ),
          this.drawNorthArrow(
            ctx,
            len * Math.cos(this.arrowPart * 3),
            len * Math.sin(this.arrowPart * 3),
            3.14,
          ),
          ctx.restore());
      }
      rect(ctx, pos, scale, color, lineWidth = 4, alpha = 1) {
        (ctx.save(),
          (ctx.globalAlpha = alpha),
          (ctx.strokeStyle = color),
          (ctx.lineWidth = lineWidth),
          ctx.beginPath(),
          ctx.translate(-client.myPlayer.offset.x, -client.myPlayer.offset.y),
          ctx.translate(pos.x, pos.y),
          ctx.rect(-scale, -scale, scale * 2, scale * 2),
          ctx.stroke(),
          ctx.closePath(),
          ctx.restore());
      }
      roundRect(ctx, x, y, w, h, r) {
        if (w < 2 * r) {
          r = w / 2;
        }
        if (h < 2 * r) {
          r = h / 2;
        }
        if (r < 0) {
          r = 0;
        }
        (ctx.beginPath(),
          ctx.moveTo(x + r, y),
          ctx.arcTo(x + w, y, x + w, y + h, r),
          ctx.arcTo(x + w, y + h, x, y + h, r),
          ctx.arcTo(x, y + h, x, y, r),
          ctx.arcTo(x, y, x + w, y, r),
          ctx.closePath());
      }
      circle(ctx, x, y, radius, color, opacity = 1, lineWidth = 4) {
        (ctx.save(),
          (ctx.globalAlpha = opacity),
          (ctx.strokeStyle = color),
          (ctx.lineWidth = lineWidth),
          ctx.beginPath(),
          ctx.translate(-client.myPlayer.offset.x, -client.myPlayer.offset.y),
          ctx.arc(x, y, radius, 0, 2 * Math.PI),
          ctx.stroke(),
          ctx.closePath(),
          ctx.restore());
      }
      fillCircle(ctx, x, y, radius, color, opacity = 1) {
        (ctx.save(),
          (ctx.globalAlpha = opacity),
          (ctx.fillStyle = color),
          ctx.beginPath(),
          ctx.translate(-client.myPlayer.offset.x, -client.myPlayer.offset.y),
          ctx.arc(x, y, radius, 0, 2 * Math.PI),
          ctx.fill(),
          ctx.closePath(),
          ctx.restore());
      }
      renderText(ctx, text, x, y, fontSize = 14, opacity = 0.5) {
        (ctx.save(),
          (ctx.fillStyle = "#fff"),
          (ctx.strokeStyle = "#3d3f42"),
          (ctx.lineWidth = 8),
          (ctx.lineJoin = "round"),
          (ctx.textBaseline = "top"),
          (ctx.globalAlpha = opacity),
          (ctx.font = fontSize + "px Hammersmith One"),
          ctx.translate(-client.myPlayer.offset.x, -client.myPlayer.offset.y),
          ctx.strokeText(text, x, y),
          ctx.fillText(text, x, y),
          ctx.restore());
      }
      line(ctx, start, end, color, opacity = 1, lineWidth = 4) {
        (ctx.save(),
          ctx.translate(-client.myPlayer.offset.x, -client.myPlayer.offset.y),
          (ctx.globalAlpha = opacity),
          (ctx.strokeStyle = color),
          (ctx.lineCap = "round"),
          (ctx.lineWidth = lineWidth),
          ctx.beginPath(),
          ctx.moveTo(start.x, start.y),
          ctx.lineTo(end.x, end.y),
          ctx.stroke(),
          ctx.restore());
      }
      arrow(ctx, length, x, y, angle, color) {
        (ctx.save(),
          ctx.translate(-client.myPlayer.offset.x, -client.myPlayer.offset.y),
          ctx.translate(x, y),
          ctx.rotate(Math.PI / 4),
          ctx.rotate(angle),
          (ctx.globalAlpha = 0.75),
          (ctx.strokeStyle = color),
          (ctx.lineCap = "round"),
          (ctx.lineWidth = 8),
          ctx.beginPath(),
          ctx.moveTo(-length, -length),
          ctx.lineTo(length, -length),
          ctx.lineTo(length, length),
          ctx.stroke(),
          ctx.restore());
      }
      cross(ctx, x, y, size, lineWidth, color) {
        (ctx.save(),
          (ctx.globalAlpha = 1),
          (ctx.lineWidth = lineWidth),
          (ctx.strokeStyle = color),
          ctx.translate(
            x - client.myPlayer.offset.x,
            y - client.myPlayer.offset.y,
          ));
        let halfSize = size / 2;
        (ctx.beginPath(),
          ctx.moveTo(-halfSize, -halfSize),
          ctx.lineTo(halfSize, halfSize),
          ctx.stroke(),
          ctx.beginPath(),
          ctx.moveTo(halfSize, -halfSize),
          ctx.lineTo(-halfSize, halfSize),
          ctx.stroke(),
          ctx.restore());
      }
      getTracerColor(entity) {
        if (entity instanceof Notify) {
          return Settings_default._notificationTracersColor;
        }
        if (Settings_default._animalTracers && entity.isAI) {
          return Settings_default._animalTracersColor;
        }
        if (
          Settings_default._teammateTracers &&
          entity.isPlayer &&
          client.myPlayer.isTeammateByID(entity.sid)
        ) {
          return Settings_default._teammateTracersColor;
        }
        if (
          Settings_default._enemyTracers &&
          entity.isPlayer &&
          client.myPlayer.isEnemyByID(entity.sid)
        ) {
          return Settings_default._enemyTracersColor;
        }
        return null;
      }
      renderTracer(ctx, entity, player) {
        let color = this.getTracerColor(entity);
        if (color === null) {
          return;
        }
        let pos1 = new Vector_default(player.x, player.y),
          pos2 = new Vector_default(entity.x, entity.y),
          w = 8,
          distance = Math.min(125 + w * 2, pos1.distance(pos2) - w * 2),
          angle = pos1.angle(pos2),
          pos = pos1.addDirection(angle, distance);
        this.arrow(ctx, w, pos.x, pos.y, angle, color);
      }
      renderDistance(ctx, entity, player) {
        let pos1 = new Vector_default(player.x, player.y),
          pos2 = new Vector_default(entity.x, entity.y),
          entityTarget = client.PlayerManager.getEntity(
            entity.sid,
            !!entity.isPlayer,
          );
        if (entityTarget === null) {
          return;
        }
        let pos3 = client.myPlayer.pos.current,
          pos4 = entityTarget.pos.current,
          distance = fixTo(pos3.distance(pos4), 2),
          center = pos1.addDirection(pos1.angle(pos2), pos1.distance(pos2) / 2);
        this.renderText(
          ctx,
          `[${entity.sid}]: ${distance}`,
          center.x,
          center.y,
        );
      }
      getMarkerColor(object) {
        let id = object.owner?.sid;
        if (typeof id !== "number") {
          return null;
        }
        if (
          Settings_default._itemMarkers &&
          client.myPlayer.isMyPlayerByID(id)
        ) {
          return Settings_default._itemMarkersColor;
        }
        if (
          Settings_default._teammateMarkers &&
          client.myPlayer.isTeammateByID(id)
        ) {
          return Settings_default._teammateMarkersColor;
        }
        if (Settings_default._enemyMarkers && client.myPlayer.isEnemyByID(id)) {
          return Settings_default._enemyMarkersColor;
        }
        return null;
      }
      renderMarker(ctx, object) {
        let color = this.getMarkerColor(object);
        if (color === null) {
          return;
        }
        let x = object.x + object.xWiggle - client.myPlayer.offset.x,
          y = object.y + object.yWiggle - client.myPlayer.offset.y;
        (ctx.save(),
          (ctx.strokeStyle = "#3b3b3b"),
          (ctx.lineWidth = 3),
          (ctx.fillStyle = color),
          ctx.beginPath(),
          ctx.arc(x, y, 9, 0, 2 * Math.PI),
          ctx.fill(),
          ctx.stroke(),
          ctx.closePath(),
          ctx.restore());
      }
      barContainer(ctx, x, y, w, h, r = 8) {
        ((ctx.fillStyle = "#3d3f42"),
          this.roundRect(ctx, x, y, w, h, r),
          ctx.fill());
      }
      barContent(ctx, x, y, w, h, fill, color) {
        let barPad = Config_default.barPad;
        ((ctx.fillStyle = color),
          this.roundRect(
            ctx,
            x + barPad,
            y + barPad,
            (w - barPad * 2) * fill,
            h - barPad * 2,
            7,
          ),
          ctx.fill());
      }
      getNameY(target) {
        let nameY = 34,
          height = 5;
        if (target === client.myPlayer && Settings_default._weaponXPBar) {
          nameY += height;
        }
        if (Settings_default._playerTurretReloadBar) {
          nameY += height;
        }
        if (Settings_default._weaponReloadBar) {
          nameY += height;
        }
        return nameY;
      }
      getContainerHeight(entity) {
        let { barHeight: barHeight, barPad: barPad } = Config_default,
          height = barHeight;
        if (entity.isPlayer) {
          let smallBarHeight = barHeight - 4,
            player = client.PlayerManager.playerData.get(entity.sid);
          if (player === void 0) {
            return height;
          }
          if (player === client.myPlayer && Settings_default._weaponXPBar) {
            height += smallBarHeight - barPad;
          }
          if (Settings_default._playerTurretReloadBar) {
            height += smallBarHeight - barPad;
          }
          if (Settings_default._weaponReloadBar) {
            height += barHeight - barPad;
          }
        }
        return height;
      }
      renderBar(ctx, entity) {
        let {
          barWidth: barWidth,
          barHeight: barHeight,
          barPad: barPad,
        } = Config_default,
          smallBarHeight = barHeight - 4,
          totalWidth = barWidth + barPad,
          scale = entity.scale + 34,
          { myPlayer: myPlayer, PlayerManager: PlayerManager } = client,
          x = entity.x - myPlayer.offset.x - totalWidth,
          y = entity.y - myPlayer.offset.y + scale;
        ctx.save();
        let player =
          entity.isPlayer && PlayerManager.playerData.get(entity.sid),
          animal = entity.isAI && PlayerManager.animalData.get(entity.sid),
          height = 0;
        if (player instanceof Player_default) {
          let [primary, secondary, turret] = player.reload;
          if (player === myPlayer && Settings_default._weaponXPBar) {
            let weapon = DataHandler_default.getWeapon(myPlayer.weapon.current),
              current =
                WeaponVariants[myPlayer.getWeaponVariant(weapon.id).current]
                  .color,
              next =
                WeaponVariants[myPlayer.getWeaponVariant(weapon.id).next].color,
              XP = myPlayer.weaponXP[weapon.itemType];
            (this.barContainer(ctx, x, y, totalWidth * 2, smallBarHeight),
              this.barContent(
                ctx,
                x,
                y,
                totalWidth * 2,
                smallBarHeight,
                1,
                current,
              ),
              this.barContent(
                ctx,
                x,
                y,
                totalWidth * 2,
                smallBarHeight,
                clamp(XP.current / XP.max, 0, 1),
                next,
              ),
              (height += smallBarHeight - barPad));
          }
          if (Settings_default._playerTurretReloadBar) {
            (this.barContainer(
              ctx,
              x,
              y + height,
              totalWidth * 2,
              smallBarHeight,
            ),
              this.barContent(
                ctx,
                x,
                y + height,
                totalWidth * 2,
                smallBarHeight,
                turret.current / turret.max,
                Settings_default._playerTurretReloadBarColor,
              ),
              (height += smallBarHeight - barPad));
          }
          if (Settings_default._weaponReloadBar) {
            (this.barContainer(ctx, x, y + height, totalWidth * 2, barHeight),
              this.barContent(
                ctx,
                x,
                y + height,
                totalWidth + 2.25,
                barHeight,
                primary.current / primary.max,
                Settings_default._weaponReloadBarColor,
              ),
              this.barContent(
                ctx,
                x + totalWidth - 2.25,
                y + height,
                totalWidth + 2.25,
                barHeight,
                secondary.current / secondary.max,
                Settings_default._weaponReloadBarColor,
              ),
              (height += barHeight - barPad));
          }
        }
        let target = player || animal;
        if (target) {
          let container = getTargetValue(Atlantis, "config");
          setTargetValue(container, "nameY", this.getNameY(target));
          let { currentHealth: currentHealth, maxHealth: maxHealth } = target,
            health = animal ? maxHealth : 100,
            color = PlayerManager.isEnemyTarget(myPlayer, target)
              ? "#a56bff"
              : "#6fd1ff";
          (this.barContainer(ctx, x, y + height, totalWidth * 2, barHeight),
            this.barContent(
              ctx,
              x,
              y + height,
              totalWidth * 2,
              barHeight,
              currentHealth / health,
              color,
            ),
            (height += barHeight));
        }
        ctx.restore();
      }
      renderHP(ctx, entity) {
        if (!Settings_default._renderHP) {
          return;
        }
        let { barPad: barPad, nameY: nameY } = Config_default,
          containerHeight = this.getContainerHeight(entity),
          text = `HP ${Math.floor(entity.health)}/${entity.maxHealth}`,
          offset = entity.scale + nameY + barPad + containerHeight,
          { myPlayer: myPlayer } = client,
          x = entity.x - myPlayer.offset.x,
          y = entity.y - myPlayer.offset.y + offset;
        if (entity.isPlayer && myPlayer.isMyPlayerByID(entity.sid)) {
          text += ` ${myPlayer.shameCount}/8`;
        }
        (ctx.save(),
          (ctx.fillStyle = "#fff"),
          (ctx.strokeStyle = "#3d3f42"),
          (ctx.lineWidth = 8),
          (ctx.lineJoin = "round"),
          (ctx.textBaseline = "top"),
          (ctx.font = "19px Hammersmith One"),
          ctx.strokeText(text, x, y),
          ctx.fillText(text, x, y),
          ctx.restore());
      }
      circularBar(ctx, object, perc, angle, color, offset = 0) {
        let x = object.x + object.xWiggle - client.myPlayer.offset.x,
          y = object.y + object.yWiggle - client.myPlayer.offset.y,
          height = Config_default.barHeight * 0.5,
          defaultScale = 10 + height / 2,
          scale = defaultScale + 1 + offset;
        return (
          ctx.save(),
          ctx.translate(x, y),
          ctx.rotate(angle),
          (ctx.lineCap = "round"),
          (ctx.strokeStyle = "#3b3b3b"),
          (ctx.lineWidth = height),
          ctx.beginPath(),
          ctx.arc(0, 0, scale, 0, perc * 2 * Math.PI),
          ctx.stroke(),
          ctx.closePath(),
          (ctx.strokeStyle = color),
          (ctx.lineWidth = height / 3),
          ctx.beginPath(),
          ctx.arc(0, 0, scale, 0, perc * 2 * Math.PI),
          ctx.stroke(),
          ctx.closePath(),
          ctx.restore(),
          defaultScale - 3
        );
      }
    })(),
    Renderer_default = Renderer;

  const Animals = [
    {
      id: 0,
      src: "cow_1",
      hostile: !1,
      killScore: 150,
      health: 500,
      weightM: 0.8,
      speed: 95e-5,
      turnSpeed: 0.001,
      scale: 72,
      drop: ["food", 50],
    },
    {
      id: 1,
      src: "pig_1",
      hostile: !1,
      killScore: 200,
      health: 800,
      weightM: 0.6,
      speed: 85e-5,
      turnSpeed: 0.001,
      scale: 72,
      drop: ["food", 80],
    },
    {
      id: 2,
      name: "Bull",
      src: "bull_2",
      hostile: !0,
      dmg: 20,
      killScore: 1e3,
      health: 1800,
      weightM: 0.5,
      speed: 94e-5,
      turnSpeed: 74e-5,
      scale: 78,
      viewRange: 800,
      chargePlayer: !0,
      drop: ["food", 100],
    },
    {
      id: 3,
      name: "Bully",
      src: "bull_1",
      hostile: !0,
      dmg: 20,
      killScore: 2e3,
      health: 2800,
      weightM: 0.45,
      speed: 0.001,
      turnSpeed: 8e-4,
      scale: 90,
      viewRange: 900,
      chargePlayer: !0,
      drop: ["food", 400],
    },
    {
      id: 4,
      name: "Wolf",
      src: "wolf_1",
      hostile: !0,
      dmg: 8,
      killScore: 500,
      health: 300,
      weightM: 0.45,
      speed: 0.001,
      turnSpeed: 0.002,
      scale: 84,
      viewRange: 800,
      chargePlayer: !0,
      drop: ["food", 200],
    },
    {
      id: 5,
      name: "Quack",
      src: "chicken_1",
      hostile: !1,
      dmg: 8,
      killScore: 2e3,
      noTrap: !0,
      health: 300,
      weightM: 0.2,
      speed: 0.0018,
      turnSpeed: 0.006,
      scale: 70,
      drop: ["food", 100],
    },
    {
      id: 6,
      name: "MOOSTAFA",
      nameScale: 50,
      src: "enemy",
      hostile: !0,
      dontRun: !0,
      fixedSpawn: !0,
      spawnDelay: 6e4,
      noTrap: !0,
      colDmg: 100,
      dmg: 40,
      killScore: 8e3,
      health: 18e3,
      weightM: 0.4,
      speed: 7e-4,
      turnSpeed: 0.01,
      scale: 80,
      spriteMlt: 1.8,
      leapForce: 0.9,
      viewRange: 1e3,
      hitRange: 210,
      hitDelay: 1e3,
      chargePlayer: !0,
      drop: ["food", 100],
    },
    {
      id: 7,
      name: "Treasure",
      hostile: !0,
      nameScale: 35,
      src: "crate_1",
      fixedSpawn: !0,
      spawnDelay: 12e4,
      colDmg: 200,
      killScore: 5e3,
      health: 2e4,
      weightM: 0.1,
      speed: 0,
      turnSpeed: 0,
      scale: 70,
      spriteMlt: 1,
    },
    {
      id: 8,
      name: "MOOFIE",
      src: "wolf_2",
      hostile: !0,
      fixedSpawn: !0,
      dontRun: !0,
      hitScare: 4,
      spawnDelay: 3e4,
      noTrap: !0,
      nameScale: 35,
      dmg: 10,
      colDmg: 100,
      killScore: 3e3,
      health: 7e3,
      weightM: 0.45,
      speed: 0.0015,
      turnSpeed: 0.002,
      scale: 90,
      viewRange: 800,
      chargePlayer: !0,
      drop: ["food", 1e3],
    },
    {
      id: 9,
      name: "ðŸ’€MOOFIE",
      src: "wolf_2",
      hostile: !0,
      fixedSpawn: !0,
      dontRun: !0,
      hitScare: 50,
      spawnDelay: 6e4,
      noTrap: !0,
      nameScale: 35,
      dmg: 12,
      colDmg: 100,
      killScore: 3e3,
      health: 9e3,
      weightM: 0.45,
      speed: 0.0015,
      turnSpeed: 0.0025,
      scale: 94,
      viewRange: 1440,
      chargePlayer: !0,
      drop: ["food", 3e3],
      minSpawnRange: 0.85,
      maxSpawnRange: 0.9,
    },
    {
      id: 10,
      name: "ðŸ’€Wolf",
      src: "wolf_1",
      hostile: !0,
      fixedSpawn: !0,
      dontRun: !0,
      hitScare: 50,
      spawnDelay: 3e4,
      dmg: 10,
      killScore: 700,
      health: 500,
      weightM: 0.45,
      speed: 0.00115,
      turnSpeed: 0.0025,
      scale: 88,
      viewRange: 1440,
      chargePlayer: !0,
      drop: ["food", 400],
      minSpawnRange: 0.85,
      maxSpawnRange: 0.9,
    },
    {
      id: 11,
      name: "ðŸ’€Bully",
      src: "bull_1",
      hostile: !0,
      fixedSpawn: !0,
      dontRun: !0,
      hitScare: 50,
      dmg: 20,
      killScore: 5e3,
      health: 5e3,
      spawnDelay: 1e5,
      weightM: 0.45,
      speed: 0.00115,
      turnSpeed: 0.0025,
      scale: 94,
      viewRange: 1440,
      chargePlayer: !0,
      drop: ["food", 800],
      minSpawnRange: 0.85,
      maxSpawnRange: 0.9,
    },
  ],
    Animals_default = Animals;

  const colors = [
    ["orange", "red"],
    ["aqua", "blue"],
  ],
    EntityRenderer = new (class {
      start = Date.now();
      step = 0;
      drawWeaponHitbox(ctx, player) {
        if (!Settings_default._weaponHitbox) {
          return;
        }
        let { myPlayer: myPlayer } = client,
          current = myPlayer.weapon.current;
        if (DataHandler_default.isMelee(current)) {
          let weapon = DataHandler_default.getWeapon(current);
          Renderer_default.circle(
            ctx,
            player.x,
            player.y,
            weapon.range,
            "#f5cb42",
            0.5,
            1,
          );
        }
      }
      drawPlacement(ctx) {
        if (!Settings_default._possiblePlacement) {
          return;
        }
        let { myPlayer: myPlayer, ModuleHandler: ModuleHandler } = client,
          [type, angles] = ModuleHandler.placeAngles;
        if (type === null || angles === null) {
          return;
        }
        let id = myPlayer.getItemByType(type);
        if (id === null) {
          return;
        }
        let dist = myPlayer.getItemPlaceScale(id),
          item = Items[id];
        for (let i = 0; i < angles.length; i++) {
          let angle = angles[i],
            pos = myPlayer.pos.current.addDirection(angle, dist);
          Renderer_default.circle(
            ctx,
            pos.x,
            pos.y,
            item.scale,
            "#80edf2",
            0.4,
            1,
          );
        }
      }
      drawEntityHP(ctx, entity) {
        (Renderer_default.renderBar(ctx, entity),
          Renderer_default.renderHP(ctx, entity));
      }
      drawHitScale(ctx, entity) {
        if (!Settings_default._weaponHitbox) {
          return;
        }
        let { PlayerManager: PlayerManager } = client,
          target = (
            entity.isPlayer
              ? PlayerManager.playerData
              : PlayerManager.animalData
          ).get(entity.sid);
        if (target !== void 0) {
          Renderer_default.circle(
            ctx,
            entity.x,
            entity.y,
            target.hitScale,
            "#3f4ec4",
            0.5,
            1,
          );
        }
        if (entity.isAI && entity.index === 6) {
          let moostafa = Animals_default[6];
          Renderer_default.circle(
            ctx,
            entity.x,
            entity.y,
            moostafa.hitRange,
            "#f5cb42",
            0.5,
            1,
          );
        }
      }
      drawDanger(ctx, entity) {
        let { PlayerManager: PlayerManager } = client;
        if (entity.isPlayer) {
          let player = PlayerManager.playerData.get(entity.sid);
          if (player !== void 0 && player.danger !== 0) {
            let isBoost = Number(player.usingBoost),
              isDanger = Number(player.danger >= 3);
            Renderer_default.fillCircle(
              ctx,
              entity.x,
              entity.y,
              player.scale,
              colors[isBoost][isDanger],
              0.3,
            );
          }
        }
        if (entity.isAI) {
          let animal = PlayerManager.animalData.get(entity.sid);
          if (animal) {
            return;
          }
        }
      }
      render(ctx, entity, player) {
        let now = Date.now();
        ((this.step = now - this.start), (this.start = now));
        let {
          myPlayer: myPlayer,
          EnemyManager: EnemyManager2,
          ModuleHandler: ModuleHandler,
          ObjectManager: ObjectManager,
          InputHandler: InputHandler,
        } = client,
          isMyPlayer = entity === player;
        if (isMyPlayer) {
          let pos = new Vector_default(player.x, player.y);
          if (Settings_default._displayPlayerAngle) {
            Renderer_default.line(
              ctx,
              pos,
              pos.addDirection(client.myPlayer.angle, 70),
              "#e9adf0",
            );
          }
          if (
            (this.drawWeaponHitbox(ctx, player),
              this.drawPlacement(ctx),
              myPlayer.isTrapped)
          ) {
            Renderer_default.fillCircle(ctx, pos.x, pos.y, 35, "yellow", 0.5);
          }
          let { pushPos: pushPos } = ModuleHandler.staticModules.autoPush,
            nearestPushSpike = client.EnemyManager.nearestPushSpike;
          if (pushPos !== null && nearestPushSpike !== null) {
            (Renderer_default.line(ctx, pos, pushPos, "white", 0.6, 1),
              Renderer_default.line(
                ctx,
                pushPos,
                nearestPushSpike.pos.current,
                "white",
                0.6,
                1,
              ));
          }
        }
        if (
          (this.drawEntityHP(ctx, entity), Settings_default._collisionHitbox)
        ) {
          Renderer_default.circle(
            ctx,
            entity.x,
            entity.y,
            entity.scale,
            "#c7fff2",
            0.5,
            1,
          );
        }
        if (!isMyPlayer) {
          (this.drawHitScale(ctx, entity),
            Renderer_default.renderTracer(ctx, entity, player),
            Renderer_default.renderDistance(ctx, entity, player));
          let nearestEnemyToNearestEnemy =
            EnemyManager2.nearestEnemyToNearestEnemy;
          if (
            nearestEnemyToNearestEnemy !== null &&
            !entity.isAI &&
            entity.sid === nearestEnemyToNearestEnemy.id
          ) {
            Renderer_default.fillCircle(
              ctx,
              entity.x,
              entity.y,
              35,
              "#48f072",
              0.5,
            );
          } else {
            this.drawDanger(ctx, entity);
          }
          let spikeCollider = EnemyManager2.enemySpikeCollider;
          if (
            spikeCollider &&
            !entity.isAI &&
            entity.sid === spikeCollider.id
          ) {
            Renderer_default.fillCircle(ctx, entity.x, entity.y, 10, "#691313");
          }
        }
        if (isMyPlayer) {
          NotificationRenderer_default.render(ctx, player);
        }
        let instakillTarget = InputHandler.instakillTarget;
        if (
          entity.isPlayer &&
          instakillTarget !== null &&
          entity.sid === instakillTarget.id
        ) {
          Renderer_default.drawTarget(ctx, entity);
          let { bowInsta: bowInsta } = ModuleHandler.staticModules;
          if (bowInsta.active) {
            (Renderer_default.circle(
              ctx,
              entity.x,
              entity.y,
              bowInsta.distMin,
              "#eda0ee",
              0.4,
              1,
            ),
              Renderer_default.circle(
                ctx,
                entity.x,
                entity.y,
                bowInsta.distMax,
                "#eda0ee",
                0.4,
                1,
              ));
          }
        }
        let {
          target: velTickTarget,
          minKB: minKB,
          maxKB: maxKB,
        } = ModuleHandler.staticModules.velocityTick;
        if (
          entity.isPlayer &&
          velTickTarget !== null &&
          entity.sid === velTickTarget.id
        ) {
          let diff = Math.abs(maxKB - minKB),
            length = minKB + (maxKB - minKB) / 2,
            angle = getAngle(entity.x, entity.y, player.x, player.y),
            posX = entity.x + Math.cos(angle) * length,
            posY = entity.y + Math.sin(angle) * length;
          Renderer_default.circle(ctx, posX, posY, diff, "#9e72ff", 0.5, 1);
        }
      }
    })(),
    EntityRenderer_default = EntityRenderer;

  class Notify {
    x;
    y;
    timeout = {
      value: 0,
      max: 2e3,
    };
    constructor(x, y) {
      ((this.x = x), (this.y = y));
    }
    animate() {
      let { value: value, max: max } = this.timeout;
      if (value >= max) {
        NotificationRenderer.remove(this);
        return;
      }
      this.timeout.value += EntityRenderer_default.step;
    }
    render(ctx, player) {
      (this.animate(), Renderer_default.renderTracer(ctx, this, player));
    }
  }

  const NotificationRenderer = new (class {
    notifications = new Set();
    remove(notify) {
      this.notifications.delete(notify);
    }
    add(object) {
      let { x: x, y: y } = object.pos.current,
        notify = new Notify(x, y);
      this.notifications.add(notify);
    }
    render(ctx, player) {
      for (let notification of this.notifications) {
        notification.render(ctx, player);
      }
    }
  })(),
    NotificationRenderer_default = NotificationRenderer;

  class SpatialHashGrid2D {
    cellSize = 0;
    grid = new Map();
    constructor(cellSize) {
      this.cellSize = cellSize;
    }
    _getKey(x, y) {
      return (x << 16) | y;
    }
    clear() {
      this.grid.clear();
    }
    insert(x, y, radius, objectId) {
      let startX = ((x - radius) / this.cellSize) | 0,
        startY = ((y - radius) / this.cellSize) | 0,
        endX = ((x + radius) / this.cellSize) | 0,
        endY = ((y + radius) / this.cellSize) | 0;
      for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
          let key = this._getKey(i, j);
          if (!this.grid.has(key)) {
            this.grid.set(key, new Set());
          }
          this.grid.get(key).add(objectId);
        }
      }
    }
    query(x, y, search = 1, callback) {
      let cellX = (x / this.cellSize) | 0,
        cellY = (y / this.cellSize) | 0,
        candidates = new Set(),
        callbackSuccess = !1;
      outerLoop: for (let i = -search; i <= search; i++) {
        for (let j = -search; j <= search; j++) {
          let key = this._getKey(cellX + i, cellY + j);
          if (this.grid.has(key)) {
            for (let objectId of this.grid.get(key)) {
              if (!candidates.has(objectId)) {
                if ((candidates.add(objectId), callback(objectId))) {
                  callbackSuccess = !0;
                  break outerLoop;
                }
              }
            }
          }
        }
      }
      return callbackSuccess;
    }
    queryFull(x, y, search = 1) {
      let cellX = (x / this.cellSize) | 0,
        cellY = (y / this.cellSize) | 0,
        candidates = new Set();
      for (let i = -search; i <= search; i++) {
        for (let j = -search; j <= search; j++) {
          let key = this._getKey(cellX + i, cellY + j);
          if (this.grid.has(key)) {
            for (let objectId of this.grid.get(key)) {
              candidates.add(objectId);
            }
          }
        }
      }
      return Array.from(candidates);
    }
    remove(x, y, radius, objectId) {
      let startX = ((x - radius) / this.cellSize) | 0,
        startY = ((y - radius) / this.cellSize) | 0,
        endX = ((x + radius) / this.cellSize) | 0,
        endY = ((y + radius) / this.cellSize) | 0;
      for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
          let key = this._getKey(i, j);
          if (this.grid.has(key)) {
            let cell = this.grid.get(key);
            if ((cell.delete(objectId), cell.size === 0)) {
              this.grid.delete(key);
            }
          }
        }
      }
    }
  }

  class Sorting {
    static byDistance(target, typeA, typeB) {
      return (a, b) => {
        let dist1 = target.position[typeA].distanceDefault(a.position[typeB]),
          dist2 = target.position[typeA].distanceDefault(b.position[typeB]);
        return dist1 - dist2;
      };
    }
    static byAngleDistance(angle) {
      return (a, b) => getAngleDist(a, angle) - getAngleDist(b, angle);
    }
    static byDanger(a, b) {
      return b.danger - a.danger;
    }
  }

  const Sorting_default = Sorting;

  class ObjectManager {
    objects = new Map();
    grid2D = new SpatialHashGrid2D(100);
    reloadingTurrets = new Map();
    attackedObjects = new Map();
    client;
    constructor(client2) {
      this.client = client2;
    }
    insertObject(object) {
      if (
        (this.grid2D.insert(
          object.pos.current.x,
          object.pos.current.y,
          object.collisionScale,
          object.id,
        ),
          this.objects.set(object.id, object),
          object instanceof PlayerObject)
      ) {
        let { PlayerManager: PlayerManager, myPlayer: myPlayer } = this.client,
          owner =
            PlayerManager.playerData.get(object.ownerID) ||
            PlayerManager.createPlayer({
              id: object.ownerID,
            });
        if (
          ((object.seenPlacement = this.inPlacementRange(object)),
            owner.handleObjectPlacement(object),
            object.type === 22)
        ) {
          if (
            myPlayer.collidingObject(object, 1) ||
            myPlayer.collidingObject(object, 4)
          ) {
            (myPlayer.teleportPos.setVec(object.pos.current),
              (myPlayer.teleported = !0));
          }
        }
      }
    }
    createObjects(buffer) {
      for (let i = 0; i < buffer.length; i += 8) {
        let isResource = buffer[i + 6] === null,
          data = [
            buffer[i + 0],
            buffer[i + 1],
            buffer[i + 2],
            buffer[i + 3],
            buffer[i + 4],
          ];
        this.insertObject(
          isResource
            ? new Resource(...data, buffer[i + 5])
            : new PlayerObject(...data, buffer[i + 6], buffer[i + 7]),
        );
      }
    }
    deletedObjects = new Set();
    isDestroyedObject() {
      return this.deletedObjects.size !== 0;
    }
    removeObject(object) {
      if (
        (this.grid2D.remove(
          object.pos.current.x,
          object.pos.current.y,
          object.collisionScale,
          object.id,
        ),
          this.objects.delete(object.id),
          object instanceof PlayerObject)
      ) {
        let player = this.client.PlayerManager.playerData.get(object.ownerID);
        if (player !== void 0) {
          player.handleObjectDeletion(object);
          let { myPlayer: myPlayer } = this.client,
            pos1 = object.pos.current.copy(),
            pos2 = this.client.myPlayer.pos.current.copy(),
            distance = pos1.distance(pos2),
            spikeID = myPlayer.getItemByType(4),
            range =
              myPlayer.getItemPlaceScale(spikeID) +
              object.placementScale +
              myPlayer.speed +
              25;
          if (distance <= range) {
            this.deletedObjects.add(object);
          }
        }
      }
    }
    removeObjectByID(id) {
      let object = this.objects.get(id);
      if (object !== void 0) {
        if ((this.removeObject(object), this.client.isOwner)) {
          let pos1 = object.pos.current.copy(),
            pos2 = this.client.myPlayer.pos.current.copy();
          if (
            Settings_default._notificationTracers &&
            !targetInsideRect(pos1, pos2, object.scale)
          ) {
            NotificationRenderer_default.add(object);
          }
        }
      }
    }
    removePlayerObjects(player) {
      for (let object of player.objects) {
        this.removeObject(object);
      }
    }
    resetTurret(id) {
      let object = this.objects.get(id);
      if (object instanceof PlayerObject) {
        ((object.reload = 0), this.reloadingTurrets.set(id, object));
      }
    }
    isEnemyObject(object) {
      if (
        object instanceof PlayerObject &&
        !this.client.myPlayer.isEnemyByID(object.ownerID)
      ) {
        return !1;
      }
      return !0;
    }
    isTurretReloaded(object, tick = 1) {
      let turret = this.reloadingTurrets.get(object.id);
      if (turret === void 0) {
        return !0;
      }
      return turret.reload > turret.maxReload - tick;
    }
    postTick() {
      for (let [id, turret] of this.reloadingTurrets) {
        if (((turret.reload += 1), turret.reload >= turret.maxReload)) {
          ((turret.reload = turret.maxReload),
            this.reloadingTurrets.delete(id));
        }
      }
    }
    canPlaceItem(id, position, addRadius = 0) {
      if (id !== 18 && pointInRiver(position)) {
        return !1;
      }
      let item = Items[id];
      return !this.grid2D.query(position.x, position.y, 1, (id2) => {
        let object = this.objects.get(id2),
          scale = item.scale + object.placementScale + addRadius;
        if (position.distance(object.pos.current) < scale) {
          return !0;
        }
      });
    }
    inPlacementRange(object) {
      let owner = this.client.PlayerManager.playerData.get(object.ownerID);
      if (
        owner === void 0 ||
        !this.client.PlayerManager.players.includes(owner)
      ) {
        return !1;
      }
      let { previous: a0, current: a1, future: a2 } = owner.pos,
        b0 = object.pos.current,
        item = Items[object.type],
        range = owner.scale * 2 + item.scale + item.placeOffset;
      return (
        a0.distance(b0) <= range ||
        a1.distance(b0) <= range ||
        a2.distance(b0) <= range
      );
    }
    getBestPlacementAngles(options) {
      let {
        position: position,
        id: id,
        targetAngle: targetAngle,
        ignoreID: ignoreID,
        reduce: reduce,
        preplace: preplace,
        fill: fill,
      } = options,
        item = DataHandler_default.getItem(id),
        { myPlayer: myPlayer, ModuleHandler: ModuleHandler } = this.client,
        length = myPlayer.getItemPlaceScale(id),
        angles = [];
      this.grid2D.query(position.x, position.y, 1, (id2) => {
        let object = this.objects.get(id2);
        if (ignoreID !== null && ignoreID === object.id) {
          return;
        }
        let pos1 = object.pos.current,
          angle = position.angle(pos1),
          a = object.placementScale + item.scale + 1,
          b = position.distance(pos1),
          c = length,
          cosArg = (b * b + c * c - a * a) / (2 * b * c);
        if (cosArg < -1) {
          angles.push([angle, Math.PI]);
        } else if (cosArg <= 1) {
          let offset = Math.acos(cosArg);
          angles.push([angle, offset]);
        }
      });
      let finalAngles = findPlacementAngles(angles);
      if (
        !angles.some(
          ([angle, offset]) => getAngleDist(targetAngle, angle) <= offset,
        )
      ) {
        if ((finalAngles.push(targetAngle), finalAngles.length === 1 && fill)) {
          if (item.itemType === 4) {
            return [];
          }
          let offset = Math.asin((2 * item.scale + 1) / (2 * length)) * 2;
          return (
            finalAngles.push(targetAngle - offset),
            finalAngles.push(targetAngle + offset),
            finalAngles.push(reverseAngle(targetAngle)),
            finalAngles.slice(0, Settings_default._placeAttempts)
          );
        }
      }
      let anglesSorted = finalAngles.sort(
        Sorting_default.byAngleDistance(targetAngle),
      );
      let enemy =
        this.client.EnemyManager.nearestTrappedEnemy ||
        this.client.EnemyManager.nearestEnemy,
        trappedIn = enemy?.trappedIn ?? null;
      if (enemy !== null && id !== 16) {
        let enemyPos = enemy.pos.current,
          enemyFuturePos = enemy.pos.future || enemyPos,
          isSpike = item.itemGroup === 2 || item.itemType === 4;
        let scoreAngle = (angle) => {
          let placedPos = position.addDirection(angle, length),
            score = 0,
            distToEnemy = placedPos.distance(enemyPos),
            collisionRange = item.scale + enemy.collisionScale;
          if (distToEnemy <= collisionRange) score += 8;
          else if (distToEnemy <= collisionRange + 20) score += 5;
          else score += Math.max(0, 3 - distToEnemy / 100);
          let distToFuture = placedPos.distance(enemyFuturePos);
          if (distToFuture <= collisionRange) score += 4;
          if (trappedIn !== null) {
            let distToTrap = placedPos.distance(trappedIn.pos.current);
            if (distToTrap <= item.scale + trappedIn.placementScale + 15) score += 5;
          }
          if (isSpike && anglesSorted.length <= 12) {
            let kbAngle = placedPos.angle(enemyPos),
              kbDist = 60,
              predictedPos = enemyPos.addDirection(kbAngle + Math.PI, kbDist);
            this.grid2D.query(predictedPos.x, predictedPos.y, 1, (objID) => {
              let obj = this.objects.get(objID);
              if (!obj || !(obj instanceof PlayerObject) || obj.itemGroup !== 2) return;
              if (this.client.PlayerManager.isEnemyByID(obj.ownerID, enemy)) return;
              if (predictedPos.distance(obj.pos.current) <= obj.collisionScale + enemy.collisionScale) {
                score += 6;
              }
            });
          }
          let escapeAngle = enemyPos.angle(position),
            placementAngleFromEnemy = enemyPos.angle(placedPos),
            escapeBlock = Math.PI - getAngleDist(escapeAngle, placementAngleFromEnemy);
          score += escapeBlock * 1.5;
          score -= getAngleDist(targetAngle, angle) * 0.3;
          return score;
        };
        anglesSorted = anglesSorted.sort((a, b) => scoreAngle(b) - scoreAngle(a));
      }
      if (reduce) {
        if (
          !DataHandler_default.canMoveOnTop(id) &&
          ModuleHandler.move_dir !== null &&
          myPlayer.speed !== 0
        ) {
          let scale = item.scale,
            offset = Math.asin((2 * scale) / (2 * length));
          anglesSorted = anglesSorted.filter(
            (angle) => getAngleDist(angle, ModuleHandler.move_dir) > offset,
          );
        }
        return anglesSorted.slice(0, Settings_default._placeAttempts);
      }
      return anglesSorted;
    }
  }

  const ObjectManager_default = ObjectManager;

  class PacketManager {
    client;
    Encoder = null;
    Decoder = null;
    packetCount = 0;
    constructor(client2) {
      if (((this.client = client2), this.client.isOwner)) {
        setInterval(() => {
          (GameUI_default.updatePackets(this.packetCount),
            (this.packetCount = 0));
        }, 1e3);
      }
    }
    send(data) {
      let { socket: socket, socketSend: socketSend } =
        this.client.SocketManager;
      if (
        socket === null ||
        socket.readyState !== socket.OPEN ||
        this.Encoder === null ||
        socketSend === null
      ) {
        return;
      }
      let [type, ...args] = data,
        encoded = this.Encoder.encode([type, args]);
      if ((socketSend(encoded), this.client.isOwner)) {
        this.packetCount += 1;
      }
    }
    clanRequest(id, accept) {
      this.send(["P", id, Number(accept)]);
    }
    kick(id) {
      this.send(["Q", id]);
    }
    joinClan(name) {
      this.send(["b", name]);
    }
    createClan(name) {
      if (!/Atlantis/i.test(name)) {
        name += " | Atlantis";
      }
      this.send(["L", name]);
    }
    leaveClan() {
      ((this.client.myPlayer.joinRequests.length = 0), this.send(["N"]));
    }
    equip(type, id) {
      this.send(["c", 0, id, type]);
    }
    buy(type, id) {
      this.send(["c", 1, id, type]);
    }
    chat(message) {
      this.send(["6", message]);
    }
    attack(angle) {
      this.send(["F", 1, angle]);
    }
    stopAttack() {
      this.send(["F", 0, null]);
    }
    resetMoveDir() {
      this.send(["e"]);
    }
    move(angle) {
      this.send(["9", angle]);
    }
    autoAttack() {
      this.send(["K", 1]);
    }
    lockRotation() {
      this.send(["K", 0]);
    }
    pingMap() {
      this.send(["S"]);
    }
    selectItemByID(id, type) {
      this.send(["z", id, type]);
    }
    spawn(name, moofoll, skin) {
      this.send([
        "M",
        {
          name: name,
          moofoll: moofoll,
          skin: skin,
        },
      ]);
    }
    upgradeItem(id) {
      this.send(["H", id]);
    }
    updateAngle(radians) {
      this.send(["D", radians]);
    }
    pingRequest() {
      ((this.client.SocketManager.startPing = performance.now()),
        this.send(["0"]));
    }
  }

  class Animal extends Entity_default {
    type;
    prevHealth = 0;
    currentHealth = 0;
    receivedDamage = 0;
    maxHealth = 0;
    isDanger = !1;
    isHostile = !1;
    isPlayer = !1;
    constructor(client2) {
      super(client2);
    }
    canBeTrapped() {
      return !("noTrap" in Animals_default[this.type]);
    }
    update(id, type, x, y, angle, health, nameIndex) {
      ((this.id = id),
        (this.type = type),
        this.pos.previous.setVec(this.pos.current),
        this.pos.current.setXY(x, y),
        this.setFuturePosition());
      let animal = Animals_default[type];
      ((this.angle = angle),
        (this.prevHealth = this.currentHealth),
        (this.currentHealth = health),
        (this.maxHealth = animal.health),
        (this.scale = animal.scale));
      let isHostile = animal.hostile && type !== 7;
      ((this.isHostile = animal.hostile),
        (this.isDanger = isHostile),
        (this.receivedDamage = 0));
      let difference = Math.abs(this.currentHealth - this.prevHealth);
      if (this.currentHealth < this.prevHealth) {
        this.receivedDamage = difference;
      }
    }
    get attackRange() {
      if (this.type === 6) {
        return Animals_default[this.type].hitRange + Config_default.playerScale;
      }
      return this.scale;
    }
    get collisionRange() {
      if (this.type === 6) {
        return Animals_default[this.type].hitRange + Config_default.playerScale;
      }
      return this.scale + 60;
    }
    get canUseTurret() {
      return this.isHostile;
    }
  }

  const Animal_default = Animal;

  class ClientPlayer extends Player_default {
    inventory = {};
    weaponXP = [{}, {}];
    itemCount = new Map();
    resources = {};
    tempGold = 0;
    deathPosition = new Vector_default();
    offset = new Vector_default();
    teleportPos = new Vector_default();
    teleported = !1;
    inGame = !1;
    wasDead = !0;
    diedOnce = !1;
    teammates = new Set();
    totalGoldAmount = 0;
    age = 1;
    upgradeAge = 1;
    prevKills = 0;
    underTurretAttack = !1;
    upgradeOrder = [];
    upgradeIndex = 0;
    joinRequests = [];
    killedSomeone = !1;
    actuallyKilledSomeone = !1;
    totalKills = 0;
    deaths = 0;
    constructor(client2) {
      super(client2);
      this.reset(!0);
    }
    isMyPlayerByID(id) {
      return id === this.id;
    }
    isTeammateByID(id) {
      return this.teammates.has(id);
    }
    isEnemyByID(id) {
      return !this.isMyPlayerByID(id) && !this.isTeammateByID(id);
    }
    get isSandbox() {
      return (
        /sandbox/.test(location.hostname) || this.client.SocketManager.isSandbox
      );
    }
    getItemByType(type) {
      return this.inventory[type];
    }
    hasResourcesForType(type) {
      if (this.isSandbox) {
        return !0;
      }
      let res = this.resources,
        {
          food: food,
          wood: wood,
          stone: stone,
          gold: gold,
        } = Items[this.getItemByType(type)].cost;
      return (
        res.food >= food &&
        res.wood >= wood &&
        res.stone >= stone &&
        res.gold >= gold
      );
    }
    getItemCount(group) {
      let item = ItemGroups[group];
      return {
        count: this.itemCount.get(group) || 0,
        limit: this.isSandbox
          ? "sandboxLimit" in item
            ? item.sandboxLimit
            : 99
          : item.limit,
      };
    }
    hasItemCountForType(type) {
      if (type === 2) {
        return !0;
      }
      let item = Items[this.getItemByType(type)],
        { count: count, limit: limit } = this.getItemCount(item.itemGroup);
      return count < limit;
    }
    canPlace(type) {
      return (
        type !== null &&
        this.getItemByType(type) !== null &&
        this.hasResourcesForType(type) &&
        this.hasItemCountForType(type)
      );
    }
    canPlaceObject(type, angle) {
      let { myPlayer: myPlayer, ObjectManager: ObjectManager2 } = this.client,
        id = myPlayer.getItemByType(type),
        current = myPlayer.getPlacePosition(myPlayer.pos.current, id, angle);
      return ObjectManager2.canPlaceItem(id, current);
    }
    getBestDestroyingWeapon(target = null) {
      let primaryID = this.getItemByType(0),
        primary = DataHandler_default.getWeapon(primaryID),
        secondaryID = this.getItemByType(1),
        isHammer = secondaryID === 10,
        notStick = primary.damage !== 1,
        notPolearm = primaryID !== 5,
        { reloading: reloading } = this.client.ModuleHandler.staticModules,
        primaryDamage = this.getBuildingDamage(primaryID, !1);
      if (
        isHammer &&
        notStick &&
        notPolearm &&
        (!reloading.isReloaded(1) || reloading.isFasterThan(0, 1)) &&
        reloading.isReloaded(0) &&
        target != null &&
        primaryDamage >= target.health
      ) {
        return 0;
      }
      if (
        target != null &&
        isHammer &&
        notStick &&
        notPolearm &&
        this.isTrapped
      ) {
        let hammerRange =
          DataHandler_default.getWeapon(secondaryID).range +
          target.hitScale +
          1,
          primaryRange = primary.range + target.hitScale,
          pos1 = this.pos.current,
          pos2 = target.pos.current,
          distance = pos1.distance(pos2);
        if (inRange(distance, hammerRange, primaryRange)) {
          return 0;
        }
      }
      if (isHammer) {
        return 1;
      }
      if (notStick) {
        return 0;
      }
      return null;
    }
    getWeaponRangeByType(type) {
      let item = this.getItemByType(type);
      if (DataHandler_default.isMelee(item)) {
        return DataHandler_default.getWeapon(item).range;
      }
      return 0;
    }
    getFastestWeapon() {
      let primary = DataHandler_default.getWeapon(this.getItemByType(0)),
        secondaryID = this.getItemByType(1);
      if (secondaryID === null) {
        return 0;
      }
      let secondary = DataHandler_default.getWeapon(secondaryID);
      if (primary.spdMult > secondary.spdMult) {
        return 0;
      }
      return 1;
    }
    getDmgOverTime() {
      let hat = Hats[this.hatID],
        accessory = Accessories[this.accessoryID],
        damage = 0;
      if ("healthRegen" in hat) {
        damage += hat.healthRegen;
      }
      if ("healthRegen" in accessory) {
        damage += accessory.healthRegen;
      }
      if (this.poisonCount !== 0) {
        damage += -5;
      }
      return Math.abs(damage);
    }
    getMaxWeaponRangeClient() {
      let primary = this.inventory[0],
        secondary = this.inventory[1],
        primaryRange = DataHandler_default.getWeapon(primary).range;
      if (DataHandler_default.isMelee(secondary)) {
        let range = DataHandler_default.getWeapon(secondary).range;
        if (range > primaryRange) {
          return range;
        }
      }
      return primaryRange;
    }
    getMaxRangeTypeDestroy() {
      let primaryID = this.inventory[0],
        secondaryID = this.inventory[1],
        primary = DataHandler_default.getWeapon(primaryID);
      if (DataHandler_default.isMelee(secondaryID)) {
        let secondary = DataHandler_default.getWeapon(secondaryID);
        if (secondaryID === 10 && secondary.range > primary.range) {
          return {
            type: 1,
            range: secondary.range,
          };
        }
      }
      if (primaryID !== 8) {
        return {
          type: 0,
          range: primary.range,
        };
      }
      return null;
    }
    getPlacePosition(start, itemID, angle) {
      return start.addDirection(angle, this.getItemPlaceScale(itemID));
    }
    tickUpdate() {
      if (this.inGame && this.wasDead) {
        ((this.wasDead = !1),
          (this.prevKills = 0),
          this.onFirstTickAfterSpawn());
      }
      let { ModuleHandler: ModuleHandler, PlayerManager: PlayerManager } =
        this.client;
      if (
        ((this.killedSomeone = !1),
          (this.actuallyKilledSomeone = !1),
          this.totalKills > this.prevKills)
      ) {
        if (
          ((this.prevKills = this.totalKills),
            (this.killedSomeone = !0),
            this.client.isOwner && GameUI_default.addCacheMessage(["kill", "You got a kill!"]),
            PlayerManager.prevPlayers.size !== 0)
        ) {
          this.actuallyKilledSomeone = !0;
        }
      }
      ModuleHandler.postTick();
    }
    updateHealth(health) {
      if (!this.inGame) {
        return;
      }
      if ((super.updateHealth(health), this.shameActive)) {
        return;
      }
      if (health < 100) {
        let { ModuleHandler: ModuleHandler } = this.client;
        ModuleHandler.staticModules.shameReset.healthUpdate();
      }
    }
    playerInit(id) {
      this.id = id;
      let { PlayerManager: PlayerManager } = this.client;
      if (!PlayerManager.playerData.has(id)) {
        PlayerManager.playerData.set(id, this);
      }
    }
    onFirstTickAfterSpawn() {
      let { ModuleHandler: ModuleHandler, isOwner: isOwner } = this.client,
        { mouse: mouse, staticModules: staticModules } = ModuleHandler;
      if (
        (ModuleHandler.equip(0, 0),
          ModuleHandler.updateAngle(mouse.sentAngle, !0),
          !isOwner)
      ) {
        let owner = this.client.owner;
        (UI_default.updateBotOption(this.client, "title"),
          owner.clientIDList.add(this.id),
          staticModules.tempData.setAttacking(owner.ModuleHandler.attacking),
          staticModules.tempData.setStore(
            0,
            owner.ModuleHandler.store[0].actual,
          ),
          staticModules.tempData.setStore(
            1,
            owner.ModuleHandler.store[1].actual,
          ));
      }
    }
    playerSpawn() {
      this.inGame = !0;
    }
    isUpgradeWeapon(id) {
      let weapon = DataHandler_default.getWeapon(id);
      if ("upgradeOf" in weapon) {
        return this.inventory[weapon.itemType] === weapon.upgradeOf;
      }
      return !0;
    }
    static BOT_LOADOUTS = {
      KH: [4, 17, 31, 27, 10, 38, 4, 25],
      PH: [5, 17, 31, 27, 10, 38, 4, 25],
      DH: [7, 17, 31, 27, 10, 38, 4, 25],
      SH: [3, 17, 31, 27, 10, 38, 6, 25],
      BH: [6, 17, 31, 27, 10, 38, 4, 25],
      STH: [8, 17, 31, 27, 10, 38, 4, 25],
      KS: [4, 17, 31, 27, 11, 38, 4, 25],
      PS: [5, 17, 31, 27, 11, 38, 4, 25],
    };
    newUpgrade(points, age) {
      if (((this.upgradeAge = age), points === 0 || age === 10)) {
        return;
      }
      let ids = [];
      for (let weapon of Weapons) {
        if (weapon.age === age && this.isUpgradeWeapon(weapon.id)) {
          ids.push(weapon.id);
        }
      }
      for (let item of Items) {
        if (item.age === age) {
          ids.push(item.id + 16);
        }
      }
      if (!this.client.isOwner) {
        let loadoutName = Settings_default._botLoadout || "KH",
          loadout = ClientPlayer.BOT_LOADOUTS[loadoutName] || ClientPlayer.BOT_LOADOUTS.KH,
          presetId = loadout[this.upgradeIndex];
        if (presetId !== void 0 && ids.includes(presetId)) {
          ((this.upgradeIndex += 1), this.client.ModuleHandler.upgradeItem(presetId));
        } else {
          let id = this.client.owner.myPlayer.upgradeOrder[this.upgradeIndex];
          if (id !== void 0 && ids.includes(id)) {
            ((this.upgradeIndex += 1), this.client.ModuleHandler.upgradeItem(id));
          }
        }
      }
    }
    updateAge(age) {
      this.age = age;
    }
    upgradeItem(id) {
      this.upgradeOrder.push(id);
      let { isOwner: isOwner, clients: clients } = this.client;
      if (isOwner) {
        for (let client2 of clients) {
          let { age: age, upgradeAge: upgradeAge } = client2.myPlayer;
          if (age > this.upgradeAge) {
            client2.myPlayer.newUpgrade(1, upgradeAge);
          }
        }
      }
      if (id < 16) {
        let weapon = DataHandler_default.getWeapon(id);
        this.inventory[weapon.itemType] = id;
        let XP = this.weaponXP[weapon.itemType];
        ((XP.current = 0), (XP.max = -1));
      } else {
        id -= 16;
        let item = Items[id];
        this.inventory[item.itemType] = id;
      }
      this.upgradeAge += 1;
    }
    updateClanMembers(teammates) {
      this.teammates.clear();
      for (let i = 0; i < teammates.length; i += 2) {
        let id = teammates[i + 0];
        if (!this.isMyPlayerByID(id)) {
          this.teammates.add(id);
        }
      }
    }
    updateItemCount(group, count) {
      if ((this.itemCount.set(group, count), this.client.isOwner)) {
        GameUI_default.updateItemCount(group);
      }
    }
    updateResources(type, amount) {
      let previousAmount = this.resources[type];
      if (((this.resources[type] = amount), type === "gold")) {
        this.tempGold = amount;
        return;
      }
      if (amount < previousAmount) {
        return;
      }
      let difference = amount - previousAmount;
      if (type === "kills") {
        if (
          ((this.totalKills += difference),
            (this.client.StatsManager.kills = difference),
            (this.client.StatsManager.totalKills = difference),
            (this.client.owner.StatsManager.globalKills = difference),
            this.client.isOwner)
        ) {
          GameUI_default.updateTotalKills(this.totalKills);
        }
        return;
      }
      this.updateWeaponXP(difference);
    }
    updateWeaponXP(amount) {
      let { next: next } = this.getWeaponVariant(this.weapon.current),
        XP =
          this.weaponXP[
          DataHandler_default.getWeapon(this.weapon.current).itemType
          ],
        maxXP = WeaponVariants[next].needXP;
      if (((XP.current += amount), XP.max !== -1 && XP.current >= XP.max)) {
        ((XP.current -= XP.max), (XP.max = maxXP));
        return;
      }
      if (XP.max === -1) {
        XP.max = maxXP;
      }
      if (XP.current >= XP.max) {
        ((XP.current -= XP.max), (XP.max = -1));
      }
    }
    resetResources() {
      ((this.resources.food = 100),
        (this.resources.wood = 100),
        (this.resources.stone = 100),
        (this.resources.gold = 100),
        (this.resources.kills = 0));
    }
    resetInventory() {
      ((this.inventory[0] = 0),
        (this.inventory[1] = null),
        (this.inventory[2] = 0),
        (this.inventory[3] = 3),
        (this.inventory[4] = 6),
        (this.inventory[5] = 10),
        (this.inventory[6] = null),
        (this.inventory[7] = null),
        (this.inventory[8] = null),
        (this.inventory[9] = null));
    }
    resetWeaponXP() {
      for (let XP of this.weaponXP) {
        ((XP.current = 0), (XP.max = -1));
      }
    }
    spawn(customName) {
      let name = customName || window.localStorage.getItem("moo_name") || "",
        skin = Number(window.localStorage.getItem("skin_color")) || 0;
      this.client.PacketManager.spawn(
        name,
        1,
        skin === 10 ? "constructor" : skin,
      );
    }
    handleJoinRequest(id, name) {
      this.joinRequests.push([id, name]);
    }
    reset(first = !1) {
      (this.resetResources(), this.resetInventory(), this.resetWeaponXP());
      let { ModuleHandler: ModuleHandler, PlayerManager: PlayerManager } =
        this.client;
      if (
        (ModuleHandler.reset(),
          (this.inGame = !1),
          (this.wasDead = !0),
          (this.upgradeOrder.length = 0),
          (this.upgradeIndex = 0),
          first)
      ) {
        return;
      }
      if (
        ((this.previousHealth = 100),
          (this.currentHealth = 100),
          (this.tempHealth = 100),
          (this.shameActive = !1),
          (this.shameCount = 0),
          (this.shameTimer = 0),
          this.deathPosition.setVec(this.pos.current),
          (this.diedOnce = !0),
          (this.client.StatsManager.deaths = 1),
          (this.deaths += 1),
          this.client.isOwner)
      ) {
        (GameUI_default.reset(), GameUI_default.updateTotalDeaths(this.deaths),
          GameUI_default.addCacheMessage(["death", "You died! (Deaths: " + this.deaths + ")"]));
      }
    }
  }

  const ClientPlayer_default = ClientPlayer;

  class PlayerManager {
    playerData = new Map();
    players = [];
    enemies = [];
    prevPlayers = new Set();
    animalData = new Map();
    clanData = new Map();
    start = Date.now();
    step = 0;
    damagesByHits = [];
    lastEnemyReceivedDamage = [0, 0];
    nearestTeammate = null;
    client;
    constructor(client2) {
      this.client = client2;
    }
    get timeSinceTick() {
      return Date.now() - this.start;
    }
    getEntity(id, isPlayer) {
      if (isPlayer && this.playerData.has(id)) {
        return this.playerData.get(id);
      } else if (!isPlayer && this.animalData.has(id)) {
        return this.animalData.get(id);
      }
      return null;
    }
    createPlayer({
      socketID: socketID,
      id: id,
      nickname: nickname,
      health: health,
      skinID: skinID,
    }) {
      let { myPlayer: myPlayer } = this.client;
      if (socketID === this.client.clientID && myPlayer.id === -1) {
        myPlayer.playerInit(id);
      }
      let player = this.playerData.get(id) || new Player_default(this.client);
      if (!this.playerData.has(id)) {
        this.playerData.set(id, player);
      }
      if (
        ((player.id = id),
          (player.prevNickname = player.nickname),
          (player.nickname = nickname || ""),
          (player.currentHealth = health || 100),
          (player.skinID = typeof skinID > "u" ? -1 : skinID),
          player.init(),
          myPlayer.isMyPlayerByID(id))
      ) {
        myPlayer.playerSpawn();
      }
      return player;
    }
    createClan(name, ownerID) {
      this.clanData.set(name, ownerID);
    }
    deleteClan(name) {
      this.clanData.delete(name);
    }
    clanExist(name) {
      return name !== null && this.clanData.has(name);
    }
    canHitTarget(player, weaponID, target) {
      let pos = target.pos.current,
        distance = player.pos.current.distance(pos),
        angle = player.pos.current.angle(pos),
        range = DataHandler_default.getWeapon(weaponID).range + target.hitScale;
      return (
        distance <= range &&
        getAngleDist(angle, player.angle) <= Config_default.gatherAngle
      );
    }
    attackPlayer(id, gathering, weaponID) {
      let player = this.playerData.get(id);
      if (player === void 0) {
        return;
      }
      let { hatID: hatID, reload: reload } = player,
        { myPlayer: myPlayer, ObjectManager: ObjectManager2 } = this.client;
      if (
        ((player.lastAttacked = myPlayer.tickCount),
          myPlayer.isMyPlayerByID(id) && !myPlayer.inGame)
      ) {
        return;
      }
      let weapon = DataHandler_default.getWeapon(weaponID),
        type = weapon.itemType;
      if (
        (player.updateMaxReload(reload[type], weaponID),
          player.resetCurrentReload(reload[type]),
          myPlayer.isEnemyByID(id))
      ) {
        if (this.canHitTarget(player, weaponID, myPlayer)) {
          let { isAble: isAble, count: count } = player.canDealPoison(weaponID);
          if (isAble) {
            myPlayer.poisonCount = count;
          }
        }
      }
      if (gathering === 1) {
        let objects = ObjectManager2.attackedObjects;
        for (let [id2, data] of objects) {
          let [hitAngle, object] = data;
          if (
            this.canHitTarget(player, weaponID, object) &&
            getAngleDist(hitAngle, player.angle) <= 1.25
          ) {
            if ((objects.delete(id2), object instanceof PlayerObject)) {
              let damage = player.getBuildingDamage(weaponID);
              object.health = Math.max(0, object.health - damage);
            } else if (player === myPlayer) {
              let amount = hatID === 9 ? 1 : 0;
              if (object.type === 3) {
                amount += weapon.gather + 4;
              }
              myPlayer.updateWeaponXP(amount);
            }
          }
        }
      }
    }
    updatePlayer(buffer) {
      ((this.players.length = 0),
        (this.enemies.length = 0),
        (this.damagesByHits.length = 0),
        (this.nearestTeammate = null));
      let now = Date.now();
      ((this.step = now - this.start), (this.start = now));
      let {
        myPlayer: myPlayer,
        isOwner: isOwner,
        EnemyManager: EnemyManager2,
      } = this.client;
      for (let i = 0; i < buffer.length; i += 13) {
        let id = buffer[i],
          player = this.playerData.get(id);
        if (
          (this.players.push(player),
            player.update(
              id,
              buffer[i + 1],
              buffer[i + 2],
              buffer[i + 3],
              buffer[i + 4],
              buffer[i + 5],
              buffer[i + 6],
              buffer[i + 7],
              buffer[i + 8],
              buffer[i + 9],
              buffer[i + 10],
            ),
            !this.client.isBotByID(id) &&
            !myPlayer.isMyPlayerByID(id) &&
            myPlayer.isTeammateByID(id) &&
            EnemyManager2.isNear(player, this.nearestTeammate, myPlayer))
        ) {
          this.nearestTeammate = player;
        } else if (myPlayer.isEnemyByID(id)) {
          this.enemies.push(player);
        }
      }
    }
    updateAnimal(buffer) {
      let { EnemyManager: EnemyManager2 } = this.client;
      for (let i = 0; i < buffer.length; i += 7) {
        let id = buffer[i];
        if (!this.animalData.has(id)) {
          this.animalData.set(id, new Animal_default(this.client));
        }
        let animal = this.animalData.get(id);
        (animal.update(
          id,
          buffer[i + 1],
          buffer[i + 2],
          buffer[i + 3],
          buffer[i + 4],
          buffer[i + 5],
          buffer[i + 6],
        ),
          EnemyManager2.handleAnimal(animal));
      }
    }
    postTick() {
      let {
        EnemyManager: EnemyManager2,
        ProjectileManager: ProjectileManager,
        ObjectManager: ObjectManager2,
        myPlayer: myPlayer,
        isOwner: isOwner,
      } = this.client;
      if (
        (ProjectileManager.postTick(),
          EnemyManager2.handleEnemies(this.enemies),
          ObjectManager2.postTick(),
          myPlayer.inGame)
      ) {
        myPlayer.tickUpdate();
      }
      if (
        (ObjectManager2.deletedObjects.clear(),
          (Settings_default._autospawn || !isOwner) && !myPlayer.inGame)
      ) {
        myPlayer.spawn();
      }
    }
    isEnemy(target1, target2) {
      return (
        target1 == null ||
        target2 == null ||
        (target1 !== target2 &&
          (target1.clanName === null ||
            target2.clanName === null ||
            target1.clanName !== target2.clanName))
      );
    }
    isEnemyByID(ownerID, target) {
      let player = this.playerData.get(ownerID);
      if (player == null) {
        throw Error("isEnemyByID Error: Failed to find an owner!");
      }
      if (player instanceof ClientPlayer_default) {
        return player.isEnemyByID(target.id);
      }
      if (target instanceof ClientPlayer_default) {
        return target.isEnemyByID(player.id);
      }
      return this.isEnemy(player, target);
    }
    isEnemyTarget(owner, target) {
      if (target instanceof Animal_default) {
        return !0;
      }
      return this.isEnemyByID(owner.id, target);
    }
    canShoot(ownerID, target) {
      return (
        target instanceof Animal_default || this.isEnemyByID(ownerID, target)
      );
    }
    canMoveOnTop(object) {
      if (object instanceof Resource) {
        return !1;
      }
      let item = DataHandler_default.getItem(object.type),
        isEnemyObject = this.isEnemyByID(object.ownerID, this.client.myPlayer);
      if ("ignoreCollision" in item && (object.type !== 15 || !isEnemyObject)) {
        return !0;
      }
      return !1;
    }
    lookingShield(owner, target) {
      if (owner instanceof Animal_default) {
        return !1;
      }
      if (owner.weapon.current !== 11) {
        return !1;
      }
      let { myPlayer: myPlayer, ModuleHandler: ModuleHandler } = this.client,
        pos1 = owner.pos.current,
        pos2 = target.pos.current,
        angle = pos1.angle(pos2),
        ownerAngle = myPlayer.isMyPlayerByID(owner.id)
          ? ModuleHandler.mouse.sentAngle
          : owner.angle;
      return getAngleDist(angle, ownerAngle) <= Config_default.shieldAngle;
    }
  }

  const PlayerManager_default = PlayerManager;

  class ProjectileManager {
    client;
    projectiles = new Map();
    ignoreCreation = new Map();
    dangerProjectiles = new Set();
    toRemove = new Set();
    totalDamage = 0;
    constructor(client2) {
      this.client = client2;
    }
    createProjectile(projectile) {
      let key = projectile.speed;
      if (!this.projectiles.has(key)) {
        this.projectiles.set(key, []);
      }
      this.projectiles.get(key).push(projectile);
    }
    foundProjectile(projectile) {
      let owner = projectile.owner;
      if (owner === null) {
        return;
      }
      let { PlayerManager: PlayerManager2, myPlayer: myPlayer } = this.client;
      if (PlayerManager2.isEnemyByID(owner.id, myPlayer)) {
        let pos1 = projectile.pos.current,
          pos2 = myPlayer.pos.current,
          distance = pos1.distance(pos2),
          angle = pos1.angle(pos2),
          offset = Math.asin((2 * myPlayer.scale) / (2 * distance));
        if (getAngleDist(angle, projectile.angle) <= offset) {
          this.dangerProjectiles.add(projectile);
        }
      }
    }
    foundProjectileThreat(projectile) {
      let owner = projectile.owner;
      if (owner === null) {
        return;
      }
      let {
        PlayerManager: PlayerManager2,
        myPlayer: myPlayer,
        SocketManager: SocketManager,
      } = this.client;
      for (let enemy of PlayerManager2.enemies) {
        if (!PlayerManager2.isEnemyByID(owner.id, enemy)) {
          continue;
        }
        let pos1 = projectile.pos.current,
          pos2 = enemy.pos.current,
          distance = pos1.distance(pos2),
          angle = pos1.angle(pos2),
          offset = Math.asin((2 * enemy.scale) / (2 * distance));
        if (getAngleDist(angle, projectile.angle) <= offset) {
          let tickDistance = Math.ceil(
            distance / (projectile.speed * SocketManager.TICK),
          );
          enemy.nextDamageTick = myPlayer.tickCount + tickDistance;
        }
      }
    }
    postTick() {
      (this.projectiles.clear(), (this.totalDamage = 0));
      for (let proj of this.dangerProjectiles) {
        if (
          ((proj.life -= 1),
            proj.shouldRemove() || this.toRemove.delete(proj.id))
        ) {
          this.dangerProjectiles.delete(proj);
          continue;
        }
        this.totalDamage += proj.damage;
      }
      this.toRemove.clear();
    }
  }

  const ProjectileManager_default = ProjectileManager;

  class Projectile {
    pos = {};
    angle;
    range;
    speed;
    type;
    onPlatform;
    id;
    isTurret;
    scale;
    maxRange;
    damage;
    owner = null;
    life = 9;
    constructor(angle, range, speed, type, onPlatform, id, maxRange) {
      ((this.isTurret = type === 1),
        (this.angle = angle),
        (this.range = range),
        (this.speed = speed),
        (this.type = type),
        (this.onPlatform = onPlatform),
        (this.id = id),
        (this.scale = Projectiles[type].scale),
        (this.maxRange = maxRange || 0),
        (this.damage = Projectiles[type].damage));
    }
    formatFromCurrent(pos, increase) {
      if (this.isTurret) {
        return pos;
      }
      return pos.addDirection(this.angle, increase ? 70 : -70);
    }
    shouldRemove() {
      return this.life <= 0;
    }
  }

  const Projectile_default = Projectile;

  const StoreHandler = new (class {
    isOpened = !1;
    store = [
      {
        previous: -1,
        current: -1,
        list: new Map(),
      },
      {
        previous: -1,
        current: -1,
        list: new Map(),
      },
    ];
    currentType = 0;
    isRightStore(type) {
      return this.isOpened && this.currentType === type;
    }
    createStore(type) {
      let storeContainer = document.createElement("div");
      ((storeContainer.id = "storeContainer"),
        (storeContainer.style.display = "none"));
      let button = document.createElement("div");
      ((button.id = "toggleStoreType"),
        (button.textContent = type === 0 ? "Hats" : "Accessories"),
        (button.onmousedown = () => {
          if (
            ((this.currentType = this.currentType === 0 ? 1 : 0),
              (button.textContent =
                this.currentType === 0 ? "Hats" : "Accessories"),
              this.isOpened)
          ) {
            this.fillStore(this.currentType);
          }
        }),
        storeContainer.appendChild(button));
      let itemHolder = document.createElement("div");
      ((itemHolder.id = "itemHolder"),
        storeContainer.appendChild(itemHolder),
        itemHolder.addEventListener("wheel", (event) => {
          event.preventDefault();
          let scale = Math.sign(event.deltaY) * 50;
          itemHolder.scroll(0, itemHolder.scrollTop + scale);
        }));
      let { gameUI: gameUI } = GameUI_default.getElements();
      gameUI.appendChild(storeContainer);
    }
    getTextEquip(type, id, price) {
      let { list: list, current: current } = this.store[type];
      if (current === id) {
        return "Unequip";
      }
      if (list.has(id) || price === 0) {
        return "Equip";
      }
      return "Buy";
    }
    generateStoreElement(type, id, name, price, isTop) {
      let src = [["hats/hat", "accessories/access"][type], id];
      if (isTop) {
        src.push("p");
      }
      let html = `\n            <div class="storeItemContainer">\n                <img class="storeHat" src="./img/${src.join("_")}.png">\n                <span class="storeItemName">${name}</span>\n                <div class="equipButton" data-id="${id}">${this.getTextEquip(type, id, price)}</div>\n            </div>\n        `,
        div = document.createElement("div");
      div.innerHTML = html;
      let img = div.querySelector(".storeHat");
      img.src = `./img/${src.join("_")}.png`;
      let equipButton = div.querySelector(".equipButton");
      return (
        (equipButton.onmousedown = () => {
          client.ModuleHandler.equip(type, id, !0, !0);
        }),
        div.firstElementChild
      );
    }
    fillStore(type) {
      let { itemHolder: itemHolder } = GameUI_default.getElements();
      itemHolder.innerHTML = "";
      let items = Settings_default._storeItems[type];
      for (let id of items) {
        let item = DataHandler_default.getStoreItem(type, id),
          element = this.generateStoreElement(
            type,
            id,
            item.name,
            item.price,
            "topSprite" in item,
          );
        itemHolder.appendChild(element);
      }
    }
    handleEquipUpdate(type, prev, curr, isBuy) {
      if (!this.isRightStore(type)) {
        return;
      }
      let current = document.querySelector(`.equipButton[data-id="${curr}"]`);
      if (current !== null) {
        current.textContent = isBuy ? "Equip" : "Unequip";
      }
      if (!isBuy && prev !== -1) {
        let previous = document.querySelector(
          `.equipButton[data-id="${prev}"]`,
        );
        if (previous !== null) {
          previous.textContent = "Equip";
        }
      }
    }
    updateStoreState(type, action, id) {
      let store2 = this.store[type];
      if (action === 0) {
        ((store2.previous = store2.current), (store2.current = id));
        let { previous: previous, current: current, list: list } = store2;
        (list.set(previous, 0),
          list.set(current, 1),
          this.handleEquipUpdate(type, store2.previous, id, !1));
      } else {
        (store2.list.set(id, 0),
          this.handleEquipUpdate(type, store2.previous, id, !0));
      }
    }
    closeStore() {
      let { storeContainer: storeContainer, itemHolder: itemHolder } =
        GameUI_default.getElements();
      ((itemHolder.innerHTML = ""),
        (storeContainer.style.display = "none"),
        (this.isOpened = !1));
    }
    openStore() {
      GameUI_default.closePopups();
      let { storeContainer: storeContainer } = GameUI_default.getElements();
      (this.fillStore(this.currentType),
        (storeContainer.style.display = ""),
        storeContainer.classList.remove("closedItem"),
        (this.isOpened = !0));
    }
    toggleStore() {
      let { storeContainer: storeContainer, itemHolder: itemHolder } =
        GameUI_default.getElements();
      if (this.isOpened) {
        itemHolder.innerHTML = "";
      } else {
        (GameUI_default.closePopups(), this.fillStore(this.currentType));
      }
      ((storeContainer.style.display =
        storeContainer.style.display === "none" ? "" : "none"),
        (this.isOpened = !this.isOpened));
    }
    init() {
      this.createStore(0);
    }
  })(),
    StoreHandler_default = StoreHandler;

  class SocketManager {
    client;
    socket = null;
    socketSend = null;
    PacketQueue = [];
    startPing = Date.now();
    pong = 0;
    TICK = 111.11111111111111;
    packetCount = 0;
    action = null;
    constructor(client2) {
      this.client = client2;
    }
    get isSandbox() {
      return this.socket !== null && /localhost/.test(this.socket.url);
    }
    init(socket) {
      if (
        ((this.socket = socket),
          (this.socketSend = socket.send.bind(socket)),
          socket.addEventListener("message", (event) =>
            this.handleMessage(event),
          ),
          !this.client.isOwner)
      ) {
        return;
      }
      let that = this,
        _send = socket.send;
      socket.send = function (data) {
        let decoder = that.client.PacketManager.Decoder;
        if (decoder === null) {
          return;
        }
        let decoded = decoder.decode(new Uint8Array(data)),
          temp = [decoded[0], ...decoded[1]];
        switch (temp[0]) {
          case "M": {
            let data2 = temp[1];
            ((data2.skin = GameUI_default.selectSkinColor(
              CustomStorage.get("skin_color") || 0,
            )),
              that.client.PacketManager.spawn(
                data2.name,
                data2.moofoll,
                data2.skin,
              ));
            return;
          }
        }
        return _send.call(this, data);
      };
    }
    pingTimeout;
    handlePing() {
      if (
        ((this.pong = Math.round(performance.now() - this.startPing)),
          this.client.isOwner)
      ) {
        GameUI_default.updatePing(this.pong);
      }
      (clearTimeout(this.pingTimeout),
        (this.pingTimeout = setTimeout(() => {
          this.client.PacketManager.pingRequest();
        }, 3e3)));
    }
    handleMessage(event) {
      let decoder = this.client.PacketManager.Decoder;
      if (decoder === null) {
        return;
      }
      let data = event.data,
        decoded = decoder.decode(new Uint8Array(data)),
        temp = [decoded[0], ...decoded[1]],
        {
          myPlayer: myPlayer,
          EnemyManager: EnemyManager2,
          ModuleHandler: ModuleHandler,
          PlayerManager: PlayerManager2,
          ObjectManager: ObjectManager2,
          ProjectileManager: ProjectileManager2,
          LeaderboardManager: LeaderboardManager2,
          PacketManager: PacketManager2,
        } = this.client;
      switch (temp[0]) {
        case "0":
          this.handlePing();
          break;

        case "io-init":
          if (
            ((this.client.connectSuccess = !0),
              (this.client.clientID = temp[1]),
              PacketManager2.pingRequest(),
              this.client.isOwner)
          ) {
            (GameUI_default.loadGame(),
              Logger.staticLog(
                "%c ATLANTIS ",
                "background: #7d6bff; color: #000; font-weight: bold; font-size: 20px;",
              ),
              GameUI_default.handleMessageLog("[Atlantis] Enjoy!"),
              GameUI_default.addCacheMessage(["join", "Connected to server"]),
              Logger.test("Successfully connected to a server.."),
              (document.title = "Atlantis"));
          } else {
            let originalName =
              window.localStorage.getItem("moo_name") || "Player";
            (this.client.myPlayer.spawn(originalName),
              this.socket.dispatchEvent(new Event("connected")),
              Logger.test("Bot spawned.."));
          }
          break;

        case "C":
          myPlayer.playerInit(temp[1]);
          break;

        case "P":
          (myPlayer.reset(), this.client.InputHandler.reset());
          break;

        case "N":
          this.PacketQueue.push(() => {
            let type = temp[1] === "points" ? "gold" : temp[1];
            myPlayer.updateResources(type, temp[2]);
          });
          break;

        case "D": {
          let data2 = temp[1];
          PlayerManager2.createPlayer({
            socketID: data2[0],
            id: data2[1],
            nickname: data2[2],
            health: data2[6],
            skinID: data2[9],
          });
          break;
        }

        case "O": {
          let player = PlayerManager2.playerData.get(temp[1]);
          if (player !== void 0) {
            player.updateHealth(temp[2]);
          }
          break;
        }

        case "a":
          PlayerManager2.updatePlayer(temp[1]);
          for (let i = 0; i < this.PacketQueue.length; i++) {
            this.PacketQueue[i]();
          }
          ((this.PacketQueue.length = 0),
            ObjectManager2.attackedObjects.clear(),
            EnemyManager2.preReset(),
            (this.action = createAction(() => {
              PlayerManager2.postTick();
            }, 1)));
          break;

        case "I":
          PlayerManager2.updateAnimal(temp[1] || []);
          break;

        case "H":
          if ((ObjectManager2.createObjects(temp[1]), this.action !== null)) {
            this.action();
          }
          break;

        case "Q":
          ObjectManager2.removeObjectByID(temp[1]);
          break;

        case "R": {
          let player = PlayerManager2.playerData.get(temp[1]);
          if (player !== void 0) {
            ObjectManager2.removePlayerObjects(player);
          }
          break;
        }

        case "L": {
          let object = ObjectManager2.objects.get(temp[2]);
          if (object instanceof Resource || (object && object.isDestroyable)) {
            ObjectManager2.attackedObjects.set(getUniqueID(), [
              temp[1],
              object,
            ]);
          }
          break;
        }

        case "K":
          this.PacketQueue.push(() =>
            PlayerManager2.attackPlayer(temp[1], temp[2], temp[3]),
          );
          break;

        case "M": {
          let id = temp[1],
            angle = temp[2],
            turret = ObjectManager2.objects.get(id);
          if (turret instanceof PlayerObject) {
            let creations = ProjectileManager2.ignoreCreation,
              pos = turret.pos.current.makeString();
            creations.set(pos + ":" + angle, turret);
            let owner = PlayerManager2.playerData.get(turret.ownerID);
            if (owner !== void 0) {
              let projTurret = Projectiles[1],
                projectile = new Projectile_default(
                  angle,
                  projTurret.range,
                  projTurret.speed,
                  projTurret.index,
                  projTurret.layer,
                  -1,
                );
              if (
                ((projectile.pos.current = turret.pos.current.copy()),
                  (projectile.owner = owner),
                  (turret.projectile = projectile),
                  PlayerManager2.isEnemyByID(turret.ownerID, myPlayer))
              ) {
                ProjectileManager2.foundProjectile(projectile);
              }
              ProjectileManager2.foundProjectileThreat(projectile);
            }
          }
          this.PacketQueue.push(() => ObjectManager2.resetTurret(id));
          break;
        }

        case "X": {
          let x = temp[1],
            y = temp[2],
            angle = temp[3],
            key = `${x}:${y}:${angle}`;
          if (ProjectileManager2.ignoreCreation.has(key)) {
            let proj = ProjectileManager2.ignoreCreation.get(key).projectile;
            if (proj !== null) {
              proj.id = temp[8];
            }
            ProjectileManager2.ignoreCreation.delete(key);
            return;
          }
          let projectile = new Projectile_default(
            angle,
            temp[4],
            temp[5],
            temp[6],
            temp[7],
            temp[8],
          );
          ((projectile.pos.current = projectile.formatFromCurrent(
            new Vector_default(x, y),
            !1,
          )),
            ProjectileManager2.createProjectile(projectile));
          break;
        }

        case "Y": {
          let id = temp[1];
          ProjectileManager2.toRemove.add(id);
          break;
        }

        case "4":
          myPlayer.updateClanMembers(temp[1]);
          break;

        case "3":
          if (typeof temp[1] !== "string") {
            myPlayer.teammates.clear();
          }
          break;

        case "g":
          break;

        case "2":
          myPlayer.handleJoinRequest(temp[1], temp[2]);
          break;

        case "T":
          if (temp.length === 4) {
            myPlayer.updateAge(temp[3]);
          }
          break;

        case "U":
          myPlayer.newUpgrade(temp[1], temp[2]);
          break;

        case "S":
          myPlayer.updateItemCount(temp[1], temp[2]);
          break;

        case "G":
          LeaderboardManager2.update(temp[1]);
          break;

        case "5": {
          let action = temp[1] === 0 ? 1 : 0;
          if (
            (StoreHandler_default.updateStoreState(temp[3], action, temp[2]),
              temp[1] === 0)
          ) {
            let boughtStorage = ModuleHandler.bought[temp[3]];
            if (boughtStorage !== void 0) {
              boughtStorage.add(temp[2]);
            }
          }
          break;
        }

        case "A": {
          let teams = temp[1].teams;
          for (let team of teams) {
            PlayerManager2.createClan(team.sid, team.owner);
          }
          break;
        }

        case "g":
          PlayerManager2.createClan(temp[1].sid, temp[1].owner);
          break;

        case "1":
          PlayerManager2.deleteClan(temp[1]);
          break;

        case "6": {
          let id = temp[1],
            message = temp[2],
            player = PlayerManager2.playerData.get(id);
          if (this.client.isOwner && player) {
            GameUI_default.addCacheMessage(["chat", `${player.nickname}: ${message}`]);
          }
          break;
        }

        case "7":
          break;

        default:
          break;
      }
    }
  }

  const SocketManager_default = SocketManager;

  class StatsManager {
    client;
    kills = 0;
    _totalKills = 0;
    _globalKills = 0;
    _deaths = 0;
    _autoSyncTimes = 0;
    _velocityTickTimes = 0;
    _spikeSyncHammerTimes = 0;
    _spikeSyncTimes = 0;
    _spikeTickTimes = 0;
    _knockbackTickTrapTimes = 0;
    _knockbackTickHammerTimes = 0;
    _knockbackTickTimes = 0;
    constructor(client2) {
      this.client = client2;
    }
    init() {
      ((this.totalKills = Settings_default._totalKills),
        (this.globalKills = Settings_default._globalKills),
        (this.deaths = Settings_default._deaths),
        (this.autoSyncTimes = Settings_default._autoSyncTimes),
        (this.velocityTickTimes = Settings_default._velocityTickTimes),
        (this.spikeSyncHammerTimes = Settings_default._spikeSyncHammerTimes),
        (this.spikeSyncTimes = Settings_default._spikeSyncTimes),
        (this.spikeTickTimes = Settings_default._spikeTickTimes),
        (this.knockbackTickTrapTimes =
          Settings_default._knockbackTickTrapTimes),
        (this.knockbackTickHammerTimes =
          Settings_default._knockbackTickHammerTimes),
        (this.knockbackTickTimes = Settings_default._knockbackTickTimes));
    }
    get totalKills() {
      return this._totalKills;
    }
    get globalKills() {
      return this._globalKills;
    }
    get deaths() {
      return this._deaths;
    }
    get autoSyncTimes() {
      return this._autoSyncTimes;
    }
    get velocityTickTimes() {
      return this._velocityTickTimes;
    }
    get spikeSyncHammerTimes() {
      return this._spikeSyncHammerTimes;
    }
    get spikeSyncTimes() {
      return this._spikeSyncTimes;
    }
    get spikeTickTimes() {
      return this._spikeTickTimes;
    }
    get knockbackTickTrapTimes() {
      return this._knockbackTickTrapTimes;
    }
    get knockbackTickHammerTimes() {
      return this._knockbackTickHammerTimes;
    }
    get knockbackTickTimes() {
      return this._knockbackTickTimes;
    }
    set totalKills(value) {
      if (((this._totalKills += value), !this.client.isOwner)) {
        return;
      }
      UI_default.updateStats("_totalKills", this._totalKills);
    }
    set globalKills(value) {
      if (((this._globalKills += value), !this.client.isOwner)) {
        return;
      }
      UI_default.updateStats("_globalKills", this._globalKills);
    }
    set deaths(value) {
      if (((this._deaths += value), !this.client.isOwner)) {
        return;
      }
      UI_default.updateStats("_deaths", this._deaths);
    }
    set autoSyncTimes(value) {
      if (((this._autoSyncTimes += value), !this.client.isOwner)) {
        return;
      }
      UI_default.updateStats("_autoSyncTimes", this._autoSyncTimes);
    }
    set velocityTickTimes(value) {
      if (((this._velocityTickTimes += value), !this.client.isOwner)) {
        return;
      }
      UI_default.updateStats("_velocityTickTimes", this._velocityTickTimes);
    }
    set spikeSyncHammerTimes(value) {
      if (((this._spikeSyncHammerTimes += value), !this.client.isOwner)) {
        return;
      }
      UI_default.updateStats(
        "_spikeSyncHammerTimes",
        this._spikeSyncHammerTimes,
      );
    }
    set spikeSyncTimes(value) {
      if (((this._spikeSyncTimes += value), !this.client.isOwner)) {
        return;
      }
      UI_default.updateStats("_spikeSyncTimes", this._spikeSyncTimes);
    }
    set spikeTickTimes(value) {
      if (((this._spikeTickTimes += value), !this.client.isOwner)) {
        return;
      }
      UI_default.updateStats("_spikeTickTimes", this._spikeTickTimes);
    }
    set knockbackTickTrapTimes(value) {
      if (((this._knockbackTickTrapTimes += value), !this.client.isOwner)) {
        return;
      }
      UI_default.updateStats(
        "_knockbackTickTrapTimes",
        this._knockbackTickTrapTimes,
      );
    }
    set knockbackTickHammerTimes(value) {
      if (((this._knockbackTickHammerTimes += value), !this.client.isOwner)) {
        return;
      }
      UI_default.updateStats(
        "_knockbackTickHammerTimes",
        this._knockbackTickHammerTimes,
      );
    }
    set knockbackTickTimes(value) {
      if (((this._knockbackTickTimes += value), !this.client.isOwner)) {
        return;
      }
      UI_default.updateStats("_knockbackTickTimes", this._knockbackTickTimes);
    }
  }

  class InputHandler {
    client;
    hotkeys = new Map();
    move;
    lastPosition = new Vector_default(0, 0);
    lockPosition = !1;
    mouse = {
      x: 0,
      y: 0,
      angle: 0,
    };
    rotation = !0;
    instaToggle = !1;
    instakillTarget = null;
    constructor(client2) {
      ((this.client = client2), this.reset());
    }
    instaReset() {
      ((this.instaToggle = !1), (this.instakillTarget = null));
    }
    reset() {
      (this.hotkeys.clear(), (this.move = 0), this.instaReset());
    }
    init() {
      (window.addEventListener(
        "keydown",
        (event) => this.handleKeydown(event),
        !0,
      ),
        window.addEventListener(
          "keyup",
          (event) => this.handleKeyup(event),
          !0,
        ),
        window.addEventListener(
          "mousedown",
          (event) => this.handleMousedown(event),
          !0,
        ),
        window.addEventListener(
          "mouseup",
          (event) => this.handleMouseup(event),
          !0,
        ),
        window.addEventListener(
          "mousemove",
          (event) => this.handleMouseMove(event),
          !0,
        ),
        window.addEventListener(
          "mouseover",
          (event) => this.handleMouseMove(event),
          !0,
        ),
        window.addEventListener(
          "wheel",
          (event) => ZoomHandler_default.handler(event),
          !0,
        ));
    }
    placementHandler(type, code) {
      if (this.client.myPlayer.getItemByType(type) === null) {
        return;
      }
      (this.hotkeys.set(code, type),
        this.client.ModuleHandler.startPlacement(type));
      let { isOwner: isOwner, clients: clients } = this.client;
      if (isOwner) {
        for (let client2 of clients) {
          client2.ModuleHandler.startPlacement(type);
        }
      }
    }
    cursorPosition(force = !1) {
      if (!force && this.lockPosition) {
        return this.lastPosition;
      }
      let { myPlayer: myPlayer } = this.client,
        pos = myPlayer.pos.future,
        { w: w, h: h } = ZoomHandler_default.scale.current,
        scale = Math.max(window.innerWidth / w, window.innerHeight / h),
        cursorX = (this.mouse.x - window.innerWidth / 2) / scale,
        cursorY = (this.mouse.y - window.innerHeight / 2) / scale;
      return new Vector_default(pos.x + cursorX, pos.y + cursorY);
    }
    getMovePosition(force = !1) {
      if (!force && this.lockPosition) {
        return this.lastPosition;
      }
      if (Settings_default._followCursor) {
        return this.cursorPosition(!0);
      }
      let { myPlayer: myPlayer, ModuleHandler: ModuleHandler } = this.client;
      if (ModuleHandler.move_dir !== null) {
        return myPlayer.pos.current.addDirection(
          ModuleHandler.move_dir,
          Settings_default._movementRadius,
        );
      }
      return myPlayer.pos.future;
    }
    postTick() { }
    toggleBotPosition() {
      let state = !this.lockPosition;
      if (state) {
        this.lastPosition.setVec(this.getMovePosition(!0));
      }
      this.lockPosition = state;
    }
    handleMovement() {
      let angle = getAngleFromBitmask(this.move, !1);
      this.client.ModuleHandler.startMovement(angle);
    }
    toggleRotation() {
      if (((this.rotation = !this.rotation), this.rotation)) {
        this.client.ModuleHandler.currentAngle = this.mouse.angle;
      }
    }
    handleKeydown(event) {
      let target = event.target;
      if (event.code === "Space" && target.tagName === "BODY") {
        event.preventDefault();
      }
      if (event.ctrlKey && ["KeyD", "KeyS", "KeyW"].includes(event.code)) {
        event.preventDefault();
      }
      if (event.repeat) {
        return;
      }
      if (UI_default.isActiveButton()) {
        return;
      }
      let isInput = isActiveInput();
      if (event.code === Settings_default._toggleMenu && !isInput) {
        UI_default.toggleMenu();
      }
      if (
        event.code === Settings_default._toggleChat &&
        !UI_default.isMenuOpened
      ) {
        GameUI_default.handleEnter(event);
      }
      if (!this.client.myPlayer.inGame) {
        return;
      }
      if (isInput) {
        return;
      }
      let { ModuleHandler: ModuleHandler } = this.client;
      if (event.code === Settings_default._food) {
        this.placementHandler(2, event.code);
      }
      if (event.code === Settings_default._wall) {
        this.placementHandler(3, event.code);
      }
      if (event.code === Settings_default._spike) {
        this.placementHandler(4, event.code);
      }
      if (event.code === Settings_default._windmill) {
        this.placementHandler(5, event.code);
      }
      if (event.code === Settings_default._farm) {
        this.placementHandler(6, event.code);
      }
      if (event.code === Settings_default._trap) {
        this.placementHandler(7, event.code);
      }
      if (event.code === Settings_default._turret) {
        this.placementHandler(8, event.code);
      }
      if (event.code === Settings_default._spawn) {
        this.placementHandler(9, event.code);
      }
      let copyMove = this.move;
      if (event.code === Settings_default._up) {
        this.move |= 1;
      }
      if (event.code === Settings_default._left) {
        this.move |= 4;
      }
      if (event.code === Settings_default._down) {
        this.move |= 2;
      }
      if (event.code === Settings_default._right) {
        this.move |= 8;
      }
      if (copyMove !== this.move) {
        this.handleMovement();
      }
      if (event.code === Settings_default._autoattack) {
        ModuleHandler.toggleAutoattack();
      }
      if (event.code === Settings_default._lockrotation) {
        this.toggleRotation();
      }
      if (event.code === Settings_default._lockBotPosition) {
        this.toggleBotPosition();
      }
      if (event.code === Settings_default._instakill) {
        this.instaToggle = !this.instaToggle;
      }
      let numMatch = event.code.match(/^Digit([1-9])$/);
      if (numMatch && !event.ctrlKey && !event.altKey) {
        let slot = parseInt(numMatch[1]) - 1,
          actionBarItem = document.getElementById("actionBarItem" + slot);
        if (actionBarItem) {
          actionBarItem.click();
        }
      }
      if (UI_default.isMenuOpened) {
        return;
      }
    }
    handleKeyup(event) {
      let {
        myPlayer: myPlayer,
        ModuleHandler: ModuleHandler,
        isOwner: isOwner,
        clients: clients,
      } = this.client;
      if (!myPlayer.inGame) {
        return;
      }
      let copyMove = this.move;
      if (event.code === Settings_default._up) {
        this.move &= -2;
      }
      if (event.code === Settings_default._left) {
        this.move &= -5;
      }
      if (event.code === Settings_default._down) {
        this.move &= -3;
      }
      if (event.code === Settings_default._right) {
        this.move &= -9;
      }
      if (copyMove !== this.move) {
        this.handleMovement();
      }
      if (
        ModuleHandler.currentType !== null &&
        this.hotkeys.delete(event.code)
      ) {
        let entry = [...this.hotkeys].pop(),
          type = entry !== void 0 ? entry[1] : null;
        if ((ModuleHandler.startPlacement(type), isOwner)) {
          for (let client2 of clients) {
            client2.ModuleHandler.startPlacement(type);
          }
        }
      }
    }
    handleMousedown(event) {
      if (
        !(event.target instanceof HTMLCanvasElement) ||
        event.target.id === "mapDisplay"
      ) {
        return;
      }
      let button = formatButton(event.button);
      if (button === "MBTN") {
        this.instaToggle = !this.instaToggle;
        return;
      }
      let {
        isOwner: isOwner,
        clients: clients,
        ModuleHandler: ModuleHandler,
      } = this.client,
        state = button === "LBTN" ? 1 : button === "RBTN" ? 2 : null;
      if (state !== null && ModuleHandler.attacking === 0) {
        if (
          ((ModuleHandler.attacking = state),
            (ModuleHandler.attackingState = state),
            isOwner)
        ) {
          for (let client2 of clients) {
            client2.ModuleHandler.staticModules.tempData.setAttacking(state);
          }
        }
      }
    }
    handleMouseup(event) {
      let button = formatButton(event.button),
        {
          isOwner: isOwner,
          clients: clients,
          ModuleHandler: ModuleHandler,
        } = this.client;
      if (
        (button === "LBTN" || button === "RBTN") &&
        ModuleHandler.attacking !== 0
      ) {
        if (!ModuleHandler.autoattack) {
          ModuleHandler.attacking = 0;
        }
        if (isOwner) {
          for (let client2 of clients) {
            client2.ModuleHandler.staticModules.tempData.setAttacking(0);
          }
        }
      }
    }
    handleMouseMove(event) {
      let { clientX: x, clientY: y } = event,
        angle = getAngle(window.innerWidth / 2, window.innerHeight / 2, x, y);
      if (((this.mouse.angle = angle), this.rotation)) {
        ((this.mouse.x = x),
          (this.mouse.y = y),
          (this.client.ModuleHandler.currentAngle = angle));
      }
    }
  }

  class TempData {
    moduleName = "tempData";
    client;
    store = [0, 0];
    constructor(client2) {
      this.client = client2;
    }
    setAttacking(attacking) {
      let { ModuleHandler: ModuleHandler } = this.client;
      if (((ModuleHandler.attacking = attacking), attacking !== 0)) {
        ModuleHandler.attackingState = attacking;
      }
    }
    setStore(type, id) {
      ((this.store[type] = id), this.handleBuy(type));
    }
    handleBuy(type) {
      let { ModuleHandler: ModuleHandler } = this.client,
        id = this.store[type];
      if (ModuleHandler.store[type].actual === id) {
        return;
      }
      if (ModuleHandler.sentHatEquip) {
        return;
      }
      let temp = ModuleHandler.canBuy(type, id) ? id : 0;
      ModuleHandler.equip(type, temp, !0);
    }
    postTick() {
      (this.handleBuy(0), this.handleBuy(1));
    }
  }

  const TempData_default = TempData;

  class Movement {
    moduleName = "movement";
    client;
    isStopped = !0;
    randomTarget = null;
    randomTargetTick = 0;
    constructor(client2) {
      this.client = client2;
    }
    getMovePosition() {
      return this.client.owner.InputHandler.getMovePosition();
    }
    circlePosition(vec) {
      let totalBots = this.client.owner.clients.size;
      if (totalBots === 0) {
        return vec;
      }
      let { circleOffset: circleOffset } = this.client.owner.ModuleHandler,
        botIndex = this.client.owner.getClientIndex(this.client),
        angle = (2 * Math.PI * botIndex) / totalBots + circleOffset;
      return vec.addDirection(angle, Settings_default._circleRadius);
    }
    getActualPosition() {
      let owner = this.client.owner,
        autoMill = owner.ModuleHandler.staticModules.autoMill,
        socketUrl = owner.SocketManager.socket?.url || "",
        isPrivate = /localhost:1234|onrender|privateserver/i.test(socketUrl);
      if (autoMill.isActive && !isPrivate) {
        return this.getFreeRoamPosition();
      }
      let pos = this.getMovePosition();
      if (Settings_default._circleFormation) {
        return this.circlePosition(pos);
      }
      return pos;
    }
    getFreeRoamPosition() {
      let { myPlayer: myPlayer, ObjectManager: ObjectManager2 } = this.client,
        nowTick = this.client.owner.ModuleHandler.tickCount,
        pos0 = myPlayer.pos.current;
      if (this.randomTarget !== null && nowTick - this.randomTargetTick < 18 && pos0.distance(this.randomTarget) > 60) {
        return this.randomTarget;
      }
      let bestTarget = pos0,
        bestScore = -Infinity,
        radius = 220;
      for (let i = 0; i < 8; i++) {
        let angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.35,
          candidate = pos0.addDirection(angle, radius),
          score = 0,
          nearbyObjects = 0,
          nearbyBots = 0;
        ObjectManager2.grid2D.query(candidate.x, candidate.y, 3, (id) => {
          let object = ObjectManager2.objects.get(id);
          if (!object) return;
          if (object instanceof Resource && object.type === 0) return;
          nearbyObjects++;
        });
        for (let bot of this.client.owner.clients) {
          if (bot === this.client || !bot.myPlayer.inGame) continue;
          if (candidate.distance(bot.myPlayer.pos.current) < 140) nearbyBots++;
        }
        if (SharedPathPlanner.isBlocked(this.client, candidate, myPlayer.scale)) {
          score -= 1e4;
        }
        score -= nearbyObjects * 18;
        score -= nearbyBots * 28;
        score += Math.random() * 4;
        if (score > bestScore) {
          bestScore = score;
          bestTarget = candidate;
        }
      }
      this.randomTarget = bestTarget;
      this.randomTargetTick = nowTick;
      return bestTarget;
    }
    someColliding(pos, radius) {
      let { myPlayer: myPlayer } = this.client,
        { previous: previous, current: current } = myPlayer.pos;
      return (
        previous.distance(pos) <= radius || current.distance(pos) <= radius
      );
    }
    postTick() {
      let { InputHandler: InputHandler2 } = this.client.owner,
        { myPlayer: myPlayer, ModuleHandler: ModuleHandler } = this.client,
        pos1 = myPlayer.pos.current,
        walkPos = this.getActualPosition(),
        lookPos = InputHandler2.cursorPosition(),
        lookAt = pos1.angle(lookPos);
      if (
        ((ModuleHandler.currentAngle = lookAt),
          !this.someColliding(walkPos, Settings_default._movementRadius))
      ) {
        let walkTo = SharedPathPlanner.getPathAngle(
          this.client,
          pos1,
          walkPos,
          myPlayer.scale,
        );
        this.isStopped = !ModuleHandler.startMovement(walkTo);
      } else if (!this.isStopped) {
        ((this.isStopped = !0), ModuleHandler.stopMovement());
      }
    }
  }

  const Movement_default = Movement;

  class ClanJoiner {
    moduleName = "clanJoiner";
    client;
    joinCount = 0;
    prevState = !1;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        myPlayer: myPlayer,
        PacketManager: PacketManager2,
        owner: owner,
        PlayerManager: PlayerManager2,
      } = this.client,
        ownerClan = owner.myPlayer.clanName,
        myClan = myPlayer.clanName,
        state = ownerClan !== myClan;
      if (this.prevState !== state) {
        ((this.prevState = state), (this.joinCount = 0));
      }
      if (
        ownerClan === null ||
        myClan === ownerClan ||
        !PlayerManager2.clanExist(ownerClan)
      ) {
        return;
      }
      if (this.joinCount === 3) {
        if (((this.joinCount = 0), myClan !== null)) {
          PacketManager2.leaveClan();
        } else if (!owner.pendingJoins.has(myPlayer.id)) {
          (owner.pendingJoins.add(myPlayer.id),
            PacketManager2.joinClan(ownerClan));
        }
      }
      this.joinCount += 1;
    }
  }

  const ClanJoiner_default = ClanJoiner;

  class Autobreak {
    moduleName = "autoBreak";
    client;
    constructor(client2) {
      this.client = client2;
    }
    getWeaponRange(id, target) {
      if (id === null) {
        return 0;
      }
      if (DataHandler_default.isMelee(id)) {
        return DataHandler_default.getWeapon(id).range + target.hitScale;
      }
      return 0;
    }
    getDestroyingObject() {
      let { EnemyManager: EnemyManager2, myPlayer: myPlayer } = this.client,
        pos0 = myPlayer.pos.current,
        primary = myPlayer.getItemByType(0),
        secondary = myPlayer.getItemByType(1),
        isPrimary = primary !== 8 && primary !== 5,
        isHammer = secondary === 10,
        nearestTrap =
          EnemyManager2.nearestTrap || EnemyManager2.nearestEnemyObject,
        nearestSpike =
          EnemyManager2.nearestSpike || EnemyManager2.nearestEnemyObject;
      if (nearestSpike) {
        let pos2 = nearestSpike.pos.current,
          distPlayerSpike = pos0.distance(pos2),
          canUseHammer =
            isHammer &&
            distPlayerSpike <= this.getWeaponRange(secondary, nearestSpike);
        if (nearestTrap) {
          let canUsePrimary =
            isPrimary &&
            distPlayerSpike <= this.getWeaponRange(primary, nearestSpike);
          if (canUseHammer || canUsePrimary) {
            return nearestSpike;
          }
          return nearestTrap;
        }
        if (canUseHammer) {
          return nearestSpike;
        }
      }
      return nearestTrap;
    }
    getDestroyingWeapon(target) {
      let { myPlayer: myPlayer, ModuleHandler: ModuleHandler } = this.client,
        pos0 = myPlayer.pos.current,
        pos1 = target.pos.current,
        distance = pos0.distance(pos1),
        primary = myPlayer.getItemByType(0),
        secondary = myPlayer.getItemByType(1),
        inPrimaryRange = distance <= this.getWeaponRange(primary, target),
        inSecondaryRange = distance <= this.getWeaponRange(secondary, target),
        isHammer = secondary === 10,
        notStick = primary !== 8,
        notPolearm = primary !== 5,
        { reloading: reloading } = ModuleHandler.staticModules,
        primaryDamage = myPlayer.getBuildingDamage(primary, !1);
      if (
        inPrimaryRange &&
        isHammer &&
        notStick &&
        notPolearm &&
        (!reloading.isReloaded(1) || reloading.isFasterThan(0, 1)) &&
        primaryDamage >= target.health
      ) {
        return 0;
      }
      if (isHammer && inSecondaryRange) {
        return 1;
      }
      if (notStick && (notPolearm || !isHammer) && inPrimaryRange) {
        return 0;
      }
      return null;
    }
    postTick() {
      let {
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
        ModuleHandler: ModuleHandler,
      } = this.client;
      if (!Settings_default._autobreak || ModuleHandler.moduleActive) {
        return;
      }
      let target = this.getDestroyingObject();
      if (target === null) {
        return;
      }
      let type = this.getDestroyingWeapon(target);
      if (type === null) {
        return;
      }
      let weapon = myPlayer.getItemByType(type),
        range = this.getWeaponRange(weapon, target),
        pos1 = myPlayer.pos.current,
        pos2 = target.pos.current;
      if (pos1.distance(pos2) > range) {
        return;
      }
      let angle = pos1.angle(pos2),
        buildingDamage = myPlayer.getBuildingDamage(weapon, !1),
        isEnoughDamage = target.health <= buildingDamage,
        nearestEnemy = EnemyManager2.nearestEnemy,
        totalDamage =
          EnemyManager2.primaryDamage + EnemyManager2.potentialSpikeDamage,
        shouldIgnore =
          EnemyManager2.instaThreat() ||
          (nearestEnemy !== null &&
            nearestEnemy.reload[0].previous !==
            nearestEnemy.reload[0].current &&
            myPlayer.currentHealth <= totalDamage &&
            myPlayer.currentHealth > totalDamage * 0.75),
        { reloading: reloading } = ModuleHandler.staticModules,
        isReloaded = reloading.isReloaded(type) && !shouldIgnore;
      
      // Equip tank when reloaded, soldier when not
      ModuleHandler.forceHat = isReloaded ? 40 : 11;
      
      if (isReloaded) {
        if (
          ((ModuleHandler.moduleActive = !0),
            (ModuleHandler.useAngle = angle),
            !isEnoughDamage)
        ) {
          ModuleHandler.forceHat = 40;
        }
        ModuleHandler.shouldAttack = !0;
      }
    }
  }

  class AutoPlacer {
    moduleName = "autoPlacer";
    client;
    placementCount = 0;
    angleList = new Map();
    _preplaceTick = 0;
    _preplaceAngles = [];
    constructor(client2) {
      this.client = client2;
    }
    canKnockbackSpike(newSpikePos, scale, enemy) {
      let pos1 = newSpikePos,
        pos2 = enemy.pos.current,
        knockbackAngle = pos1.angle(pos2);
      if (!(pos1.distance(pos2) <= enemy.collisionScale + scale)) {
        return !1;
      }
      let { ObjectManager: ObjectManager2, PlayerManager: PlayerManager2 } =
        this.client;
      return ObjectManager2.grid2D.query(pos1.x, pos1.y, 3, (id) => {
        let object = ObjectManager2.objects.get(id);
        if (!object) {
          return;
        }
        let pos3 = object.pos.current,
          isPlayerObject = object instanceof PlayerObject,
          isCactus = !isPlayerObject && object.isCactus,
          isSpike = isPlayerObject && object.itemGroup === 2;
        if (
          !(
            (!isPlayerObject ||
              PlayerManager2.isEnemyByID(object.ownerID, enemy)) &&
            (isSpike || isCactus)
          )
        ) {
          return;
        }
        let KBDistance = 200,
          spikeScale = object.collisionScale + enemy.collisionScale,
          angleToSpike = pos1.angle(pos3),
          distanceToTarget = pos2.distance(pos3),
          distanceToSpike = pos1.distance(pos3),
          offset = Math.asin((2 * spikeScale) / (2 * distanceToSpike)),
          intersecting = getAngleDist(knockbackAngle, angleToSpike) <= offset,
          overlapping = distanceToTarget <= distanceToSpike,
          inRange2 = enemy.collidingObject(object, KBDistance);
        return intersecting && overlapping && inRange2;
      });
    }
    scoreSpikeAngle(newPos, enemy, spikeScale, ObjectManager2) {
      let score = 0,
        enemyPos = enemy.pos.current,
        simFuture = ReducedMovementSimulator.predict(enemy, enemy.isTrapped ? 1 : 2, 16.66, this.client.myPlayer.pos.current),
        futurePos = enemy.pos.future || new Vector(simFuture.x, simFuture.y),
        distNow = newPos.distance(enemyPos),
        distFuture = newPos.distance(futurePos),
        collisionRange = spikeScale + enemy.collisionScale + 6,
        moveDir = enemy.dir ?? enemyPos.angle(futurePos),
        angleFromEnemy = enemyPos.angle(newPos),
        edgePadding = 700,
        mapScale = 14400;
      if (distNow <= collisionRange) score += 9;
      else if (distNow <= collisionRange + 18) score += 6;
      if (distFuture <= collisionRange) score += 5;
      if (enemy.isTrapped) score += 4;
      if (enemy.trappedIn !== null) {
        let trapDist = newPos.distance(enemy.trappedIn.pos.current);
        if (trapDist <= spikeScale + enemy.trappedIn.placementScale + 18) score += 6;
      }
      if (this.canKnockbackSpike(newPos, spikeScale, enemy)) score += 7;
      let blockScore = Math.PI - getAngleDist(angleFromEnemy, moveDir);
      score += blockScore * 2.2;
      if (
        futurePos.x <= edgePadding ||
        futurePos.y <= edgePadding ||
        futurePos.x >= mapScale - edgePadding ||
        futurePos.y >= mapScale - edgePadding
      ) {
        score += 3;
      }
      let nearbyFriendlySpikes = 0;
      let nearbyFriendlyTraps = 0;
      ObjectManager2.grid2D.query(enemyPos.x, enemyPos.y, 2, (oid) => {
        let obj = ObjectManager2.objects.get(oid);
        if (
          obj instanceof PlayerObject &&
          obj.itemGroup === 2 &&
          !this.client.PlayerManager.isEnemyByID(obj.ownerID, enemy)
        ) {
          let d = obj.pos.current.distance(enemyPos);
          if (d <= obj.collisionScale + enemy.collisionScale + 95) {
            nearbyFriendlySpikes++;
          }
        }
        if (
          obj instanceof PlayerObject &&
          obj.type === 15 &&
          !this.client.PlayerManager.isEnemyByID(obj.ownerID, enemy)
        ) {
          let d = obj.pos.current.distance(enemyPos);
          if (d <= obj.placementScale + enemy.collisionScale + 110) {
            nearbyFriendlyTraps++;
            let trapDist = newPos.distance(obj.pos.current);
            if (trapDist <= obj.placementScale + spikeScale + 32) score += 5;
          }
        }
      });
      if (nearbyFriendlySpikes >= 1) score += 3;
      if (nearbyFriendlySpikes >= 2) score += 5;
      if (nearbyFriendlyTraps >= 1) score += 3;
      return score;
    }
    scoreTrapAngle(newPos, enemy, trapScale, ObjectManager2) {
      let score = 0,
        enemyPos = enemy.pos.current,
        simFuture = ReducedMovementSimulator.predict(enemy, enemy.isTrapped ? 1 : 2, 16.66, this.client.myPlayer.pos.current),
        futurePos = enemy.pos.future || new Vector(simFuture.x, simFuture.y),
        moveDir = enemy.dir ?? enemyPos.angle(futurePos),
        distNow = newPos.distance(enemyPos),
        distFuture = newPos.distance(futurePos),
        trapRange = trapScale + enemy.collisionScale + 10,
        angleFromEnemy = enemyPos.angle(newPos);
      if (distNow <= trapRange) score += 8;
      else if (distNow <= trapRange + 18) score += 5;
      if (distFuture <= trapRange) score += 6;
      let escapeBlock = Math.PI - getAngleDist(angleFromEnemy, moveDir);
      score += escapeBlock * 2.4;
      if (enemy.isTrapped) score += 3;
      let nearbyFriendlySpikes = 0;
      ObjectManager2.grid2D.query(enemyPos.x, enemyPos.y, 2, (oid) => {
        let obj = ObjectManager2.objects.get(oid);
        if (
          obj instanceof PlayerObject &&
          obj.itemGroup === 2 &&
          !this.client.PlayerManager.isEnemyByID(obj.ownerID, enemy)
        ) {
          let d = obj.pos.current.distance(enemyPos);
          if (d <= obj.collisionScale + enemy.collisionScale + 95) nearbyFriendlySpikes++;
        }
      });
      if (nearbyFriendlySpikes >= 1) score += 2;
      return score;
    }
    _preplaceTarget = null;
    postTick() {
      if (!Settings_default._autoplacer) {
        return;
      }
      let {
        myPlayer: myPlayer,
        ObjectManager: ObjectManager2,
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
      } = this.client,
        { currentType: currentType } = ModuleHandler,
        pos0 = myPlayer.pos.current;
      if (ModuleHandler.placedOnce) {
        return;
      }
      if (Settings_default._preplacer !== !1) {
        let aboutToBreak = null;
        for (let [, obj] of ObjectManager2.objects) {
          if (!(obj instanceof PlayerObject) || !obj.isDestroyable) continue;
          if (this.client.PlayerManager.isEnemyByID(obj.ownerID, myPlayer)) continue;
          let projectedHealth = Math.min(obj.health, obj.tempHealth ?? obj.health);
          if (projectedHealth <= 0 || projectedHealth > obj.maxHealth * 0.55) continue;
          let distToMe = pos0.distance(obj.pos.current);
          if (distToMe > 300) continue;
          if (aboutToBreak === null || projectedHealth < Math.min(aboutToBreak.health, aboutToBreak.tempHealth ?? aboutToBreak.health)) {
            aboutToBreak = obj;
          }
        }
        if (aboutToBreak !== null) {
          let objPos = aboutToBreak.pos.current,
            replaceType = aboutToBreak.itemGroup === 2 ? 4 : aboutToBreak.type === 15 ? 7 : aboutToBreak.type === 16 ? 7 : null;
          if (replaceType !== null && myPlayer.canPlace(replaceType)) {
            let selfPred = ReducedMovementSimulator.predict(myPlayer, 1, 16.66, nearestEnemy?.pos?.current),
              predPos = new Vector(selfPred.x, selfPred.y),
              replaceOrigin = pos0.distance(objPos) > predPos.distance(objPos) ? predPos : pos0,
              replaceAnglePred = replaceOrigin.angle(objPos),
              replaceID = myPlayer.getItemByType(replaceType),
              angles = ObjectManager2.getBestPlacementAngles({
                position: replaceOrigin,
                id: replaceID,
                targetAngle: replaceAnglePred,
                ignoreID: aboutToBreak.id,
                preplace: !0,
                reduce: !0,
                fill: !1,
              });
            if (replaceType === 4 && nearestEnemy !== null) {
              let replaceScale = Items[replaceID].scale;
              angles = angles
                .map((a) => ({
                  angle: a,
                  score: this.scoreSpikeAngle(replaceOrigin.addDirection(a, myPlayer.getItemPlaceScale(replaceID)), nearestEnemy, replaceScale, ObjectManager2) + (this._preplaceTarget === aboutToBreak.id ? 2 : 0),
                }))
                .sort((a, b) => b.score - a.score)
                .map((a) => a.angle);
            }
            angles = angles.slice(0, 3);
            if (angles.length > 0) {
              ModuleHandler.placeAngles[0] = replaceType;
              ModuleHandler.placedOnce = !0;
              for (let a of angles) {
                ModuleHandler.place(replaceType, a);
                ModuleHandler.placeAngles[1].push(a);
              }
              this._preplaceTarget = aboutToBreak.id;
              this._preplaceTick = ModuleHandler.tickCount;
              this._preplaceAngles = angles.slice();
              return;
            }
          }
        }
        if (this._preplaceAngles.length && ModuleHandler.tickCount - this._preplaceTick <= 2 && myPlayer.canPlace(ModuleHandler.placeAngles[0] ?? 4)) {
          ModuleHandler.placeAngles[0] = this._preplaceTarget !== null && ModuleHandler.placeAngles[0] !== null ? ModuleHandler.placeAngles[0] : 4;
          ModuleHandler.placedOnce = !0;
          for (let a of this._preplaceAngles) {
            ModuleHandler.place(ModuleHandler.placeAngles[0], a);
            ModuleHandler.placeAngles[1].push(a);
          }
          return;
        }
        this._preplaceTarget = null;
        this._preplaceAngles.length = 0;
      }
      let nearestEnemy =
        EnemyManager2.nearestTrappedEnemy || EnemyManager2.nearestEnemy;
      if (nearestEnemy === null) {
        return;
      }
      if (
        !myPlayer.collidingSimple(
          nearestEnemy,
          Settings_default._autoplacerRadius,
        )
      ) {
        return;
      }
      if (
        myPlayer.speed > 5 ||
        ObjectManager2.isDestroyedObject() ||
        nearestEnemy.lastAttacked === myPlayer.tickCount
      ) {
        this.angleList.clear();
      }
      let nearestAngle = pos0.angle(nearestEnemy.pos.current),
        itemType = null,
        spike = myPlayer.getItemByType(4),
        trap = myPlayer.getItemByType(7),
        spikeAngles = ObjectManager2.getBestPlacementAngles({
          position: pos0,
          id: spike,
          targetAngle: nearestAngle,
          ignoreID: null,
          preplace: !0,
          reduce: !0,
          fill: !0,
        }),
        spikeScale = Items[spike].scale,
        angles = [],
        length = myPlayer.getItemPlaceScale(spike);
      let trapAngles = [];
      if (trap !== null && trap !== 16 && myPlayer.canPlace(7)) {
        let trapScale = Items[trap].scale,
          trapLength = myPlayer.getItemPlaceScale(trap),
          scoredTrapAngles = ObjectManager2.getBestPlacementAngles({
            position: pos0,
            id: trap,
            targetAngle: nearestAngle,
            ignoreID: null,
            preplace: !0,
            reduce: !0,
            fill: !0,
          })
            .map((angle) => ({
              angle,
              score: this.scoreTrapAngle(pos0.addDirection(angle, trapLength), nearestEnemy, trapScale, ObjectManager2),
            }))
            .sort((a, b) => b.score - a.score);
        if (scoredTrapAngles.length && scoredTrapAngles[0].score >= 3.5) {
          trapAngles = scoredTrapAngles.slice(0, nearestEnemy.isTrapped ? 2 : 3).map((entry) => entry.angle);
        }
      }
      let scoredSpikeAngles = spikeAngles
        .map((angle) => {
          let newPos = pos0.addDirection(angle, length),
            score = this.scoreSpikeAngle(newPos, nearestEnemy, spikeScale, ObjectManager2);
          if (nearestEnemy.wasTrapped()) score += 4;
          return { angle: angle, score: score };
        })
        .sort((a, b) => b.score - a.score);
      let spikeThreshold = nearestEnemy.isTrapped ? 4 : 7;
      let trapTopScore = trapAngles.length ? this.scoreTrapAngle(pos0.addDirection(trapAngles[0], myPlayer.getItemPlaceScale(trap)), nearestEnemy, Items[trap].scale, ObjectManager2) : -Infinity;
      if (trapAngles.length && !nearestEnemy.isTrapped && !(scoredSpikeAngles.length && scoredSpikeAngles[0].score >= Math.max(spikeThreshold, trapTopScore + 2))) {
        angles = trapAngles;
        itemType = 7;
      } else if (scoredSpikeAngles.length && scoredSpikeAngles[0].score >= spikeThreshold) {
        angles = scoredSpikeAngles
          .slice(0, nearestEnemy.isTrapped ? 4 : 2)
          .map((entry) => entry.angle);
        itemType = 4;
      }
      if (angles.length === 0) {
        let type = currentType && currentType !== 2 ? currentType : 7;
        if (!myPlayer.canPlace(type)) {
          return;
        }
        let id = myPlayer.getItemByType(type);
        if (id === 16) {
          return;
        }
        if (this.placementCount >= 4) {
          type = 4;
        }
        if (
          ((angles = ObjectManager2.getBestPlacementAngles({
            position: pos0,
            id: id,
            targetAngle: nearestAngle,
            ignoreID: null,
            preplace: !0,
            reduce: !0,
            fill: !0,
          })),
            (itemType = type),
            type === 4 && angles.length !== 0)
        ) {
          this.placementCount = 0;
        }
      }
      if (itemType === null || angles.length === 0) {
        return;
      }
      ((ModuleHandler.placeAngles[0] = itemType),
        (ModuleHandler.placedOnce = !0));
      for (let angle of angles) {
        if (!this.angleList.has(angle)) {
          this.angleList.set(angle, 0);
        }
        let angleCount = this.angleList.get(angle);
        if (angleCount >= 4) {
          continue;
        }
        (this.angleList.set(angle, angleCount + 1),
          ModuleHandler.place(itemType, angle),
          ModuleHandler.placeAngles[1].push(angle));
      }
      if (itemType !== 4) {
        this.placementCount += 1;
      }
    }
  }

  const AutoPlacer_default = AutoPlacer;

  class AutoSync {
    moduleName = "autoSync";
    client;
    useTurret = !1;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client;
      if (ModuleHandler.moduleActive || !Settings_default._autoSync) {
        this.useTurret = !1;
        return;
      }
      let {
        nearestEnemy: nearestEnemy,
        nearestEnemyToNearestEnemy: nearestEnemyToNearestEnemy,
      } = EnemyManager2;
      if (nearestEnemy === null || nearestEnemyToNearestEnemy === null) {
        return;
      }
      let reloading = ModuleHandler.staticModules.reloading,
        turretReloaded = reloading.isReloaded(2);
      if (this.useTurret) {
        if (((this.useTurret = !1), turretReloaded)) {
          ((ModuleHandler.moduleActive = !0), (ModuleHandler.forceHat = 53));
        }
        return;
      }
      let primary1 = myPlayer.getItemByType(0),
        primaryDamage1 = myPlayer.getMaxWeaponDamage(primary1, !1),
        range1 =
          DataHandler_default.getWeapon(primary1).range + nearestEnemy.hitScale,
        isPrimaryReloaded1 = reloading.isReloaded(0),
        primary2 = nearestEnemyToNearestEnemy.weapon.primary,
        primaryDamage2 = nearestEnemyToNearestEnemy.getMaxWeaponDamage(
          primary2,
          !1,
        ),
        range2 =
          DataHandler_default.getWeapon(primary2).range + nearestEnemy.hitScale,
        isPrimaryReloaded2 = nearestEnemyToNearestEnemy.isReloaded(0, 0),
        soldierDefense = Hats[6].dmgMult;
      if ((primaryDamage1 + primaryDamage2) * soldierDefense < 100) {
        return;
      }
      let inWeaponRange1 = myPlayer.collidingSimple(
        nearestEnemy,
        range1,
        myPlayer.getFuturePosition(myPlayer.speed / 3),
      ),
        inWeaponRange2 = nearestEnemyToNearestEnemy.collidingSimple(
          nearestEnemy,
          range2,
          nearestEnemyToNearestEnemy.getFuturePosition(
            nearestEnemyToNearestEnemy.speed / 3,
          ),
        );
      if (!inWeaponRange1 || !inWeaponRange2) {
        return;
      }
      let pos1 = myPlayer.pos.future,
        pos2 = nearestEnemy.pos.future,
        angleToEnemy = pos1.angle(pos2);
      if (!isPrimaryReloaded1) {
        if (((ModuleHandler.forceWeapon = 0), isPrimaryReloaded2)) {
          ModuleHandler.moduleActive = !0;
        }
      }
      if (isPrimaryReloaded1 && isPrimaryReloaded2) {
        ((ModuleHandler.moduleActive = !0),
          (ModuleHandler.useAngle = angleToEnemy),
          (ModuleHandler.forceHat = 7),
          (ModuleHandler.forceWeapon = 0),
          (ModuleHandler.shouldAttack = !0),
          (this.useTurret = !0),
          (this.client.StatsManager.autoSyncTimes = 1));
      }
    }
  }

  class Instakill {
    moduleName = "instakill";
    client;
    targetEnemy = null;
    constructor(client2) {
      this.client = client2;
    }
    reset() {
      this.targetEnemy = null;
    }
    postTick() {
      let {
        myPlayer: myPlayer,
        EnemyManager: EnemyManager2,
        PlayerManager: PlayerManager2,
        ModuleHandler: ModuleHandler,
        InputHandler: InputHandler2,
      } = this.client;
      if (!InputHandler2.instaToggle) {
        (this.reset(), InputHandler2.instaReset());
        return;
      }
      let nearestEnemy = EnemyManager2.nearestEnemy;
      if (nearestEnemy === null) {
        return;
      }
      let lookingShield = PlayerManager2.lookingShield(nearestEnemy, myPlayer),
        primary = myPlayer.getItemByType(0),
        primaryDamage = myPlayer.getMaxWeaponDamage(primary, lookingShield),
        secondary = myPlayer.getItemByType(1);
      if (secondary === null || !DataHandler_default.isShootable(secondary)) {
        return;
      }
      let secondaryDamage = myPlayer.getMaxWeaponDamage(
        secondary,
        lookingShield,
      );
      if ((primaryDamage + secondaryDamage + 25) * 0.75 < 100) {
        return;
      }
      let pos1 = myPlayer.pos.future,
        pos2 = nearestEnemy.pos.future,
        angle = pos1.angle(pos2);
      if (this.targetEnemy !== null) {
        ((ModuleHandler.moduleActive = !0),
          (ModuleHandler.useAngle = angle),
          (ModuleHandler.forceHat = 53),
          (ModuleHandler.forceWeapon = 1),
          (ModuleHandler.shouldAttack = !0),
          (this.targetEnemy = null),
          InputHandler2.instaReset());
        return;
      }
      InputHandler2.instakillTarget = nearestEnemy;
      let { reloading: reloading } = ModuleHandler.staticModules,
        primaryReloaded = reloading.isReloaded(0),
        secondaryReloaded = reloading.isReloaded(1),
        turretReloaded = reloading.isReloaded(2),
        range =
          DataHandler_default.getWeapon(primary).range + nearestEnemy.hitScale;
      if (
        !primaryReloaded ||
        !secondaryReloaded ||
        !turretReloaded ||
        !myPlayer.collidingSimple(nearestEnemy, range)
      ) {
        return;
      }
      ((ModuleHandler.moduleActive = !0),
        (ModuleHandler.useAngle = angle),
        (ModuleHandler.forceHat = 7),
        (ModuleHandler.forceWeapon = 0),
        (ModuleHandler.shouldAttack = !0),
        (this.targetEnemy = nearestEnemy));
    }
  }

  class AntiRetrap {
    moduleName = "antiRetrap";
    client;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client;
      if (ModuleHandler.moduleActive || !Settings_default._antiRetrap) {
        return;
      }
      let { reloading: reloading } = ModuleHandler.staticModules,
        nearestTrap = EnemyManager2.nearestTrap,
        primary = myPlayer.getItemByType(0),
        trapID = myPlayer.getItemByType(7),
        isReloadedPrimary = reloading.isReloaded(0),
        isHammer = myPlayer.getItemByType(1) === 10,
        isReloadedSecondary = reloading.isReloaded(1),
        damage = myPlayer.getBuildingDamage(10, !0),
        turretReloaded = reloading.isReloaded(2),
        nearestEnemy = EnemyManager2.nearestEnemy;
      if (
        nearestEnemy === null ||
        nearestTrap === null ||
        nearestTrap.health > damage ||
        !isHammer ||
        !isReloadedSecondary
      ) {
        return;
      }
      let range =
        DataHandler_default.getWeapon(primary).range + nearestEnemy.hitScale;
      if (!myPlayer.collidingEntity(nearestEnemy, range)) {
        return;
      }
      let pos1 = myPlayer.pos.current,
        pos2 = nearestEnemy.pos.current,
        angle = pos1.angle(pos2);
      if (nearestEnemy.isTrapped && trapID === 16 && myPlayer.canPlace(7)) {
        let escapeDir = pos2.angle(pos1),
          enemyMoveDir = nearestEnemy.dir ?? escapeDir,
          predictedEscapeAngle = escapeDir * 0.4 + enemyMoveDir * 0.6,
          retrapAngles = this.client.ObjectManager.getBestPlacementAngles({
            position: pos1,
            id: trapID,
            targetAngle: predictedEscapeAngle,
            ignoreID: nearestTrap.id,
            preplace: !0,
            reduce: !0,
            fill: !0,
          }),
          placeLength = myPlayer.getItemPlaceScale(trapID),
          trapScale = Items[trapID].scale,
          enemyFuture = nearestEnemy.pos.future || pos2,
          scored = retrapAngles.map((a) => {
            let trapPos = pos1.addDirection(a, placeLength),
              score = 0,
              distToEnemy = trapPos.distance(pos2),
              distToFuture = trapPos.distance(enemyFuture);
            if (distToEnemy <= trapScale + nearestEnemy.collisionScale + 10) score += 5;
            if (distToFuture <= trapScale + nearestEnemy.collisionScale + 10) score += 4;
            let escapeBlockAngle = pos2.angle(trapPos),
              blockScore = Math.PI - getAngleDist(escapeBlockAngle, enemyMoveDir);
            score += blockScore * 2;
            let distToCurrentTrap = trapPos.distance(nearestTrap.pos.current);
            if (distToCurrentTrap <= trapScale + nearestTrap.placementScale + 20) score += 3;
            return { angle: a, score: score };
          }).sort((a, b) => b.score - a.score).slice(0, 2);
        if (scored.length !== 0) {
          let bestRetrapAngles = scored.map((s) => s.angle);
          for (let retrapAngle of bestRetrapAngles) {
            ModuleHandler.place(7, retrapAngle);
          }
          ModuleHandler.placeAngles[0] = 7;
          ModuleHandler.placeAngles[1] = bestRetrapAngles;
          ModuleHandler.placedOnce = !0;
        }
      }
      if (isReloadedPrimary) {
        if (
          ((ModuleHandler.moduleActive = !0),
            (ModuleHandler.forceWeapon = 0),
            (ModuleHandler.useAngle = angle),
            (ModuleHandler.shouldAttack = !0),
            turretReloaded)
        ) {
          ModuleHandler.forceHat = 53;
        }
      }
    }
  }

  class KnockbackTick {
    moduleName = "knockbackTick";
    client;
    useTurret = !1;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client;
      if (
        ModuleHandler.moduleActive ||
        !Settings_default._knockbackTick ||
        EnemyManager2.shouldIgnoreModule()
      ) {
        this.useTurret = !1;
        return;
      }
      let {
        nearestEnemySpikeCollider: nearestEnemySpikeCollider,
        spikeCollider: spikeCollider,
      } = EnemyManager2,
        reloading = ModuleHandler.staticModules.reloading,
        primary = myPlayer.getItemByType(0),
        primaryReloaded = reloading.isReloaded(0);
      reloading.isReloaded(2);
      if (this.useTurret) {
        ((this.useTurret = !1),
          (ModuleHandler.moduleActive = !0),
          (ModuleHandler.forceHat = 53));
        return;
      }
      if (
        nearestEnemySpikeCollider !== null &&
        !nearestEnemySpikeCollider.isTrapped &&
        spikeCollider !== null &&
        primaryReloaded
      ) {
        let myPred = ReducedMovementSimulator.predict(myPlayer, 1, 16.66, nearestEnemySpikeCollider.pos.current, ModuleHandler.move_dir),
          enemyPred = ReducedMovementSimulator.predict(nearestEnemySpikeCollider, 1, 16.66, myPlayer.pos.current),
          pos1 = new Vector(myPred.x, myPred.y),
          pos2 = new Vector(enemyPred.x, enemyPred.y),
          pos3 = spikeCollider.pos.current,
          angleToEnemy = pos1.angle(pos2),
          distanceToSpike2 = pos2.distance(pos3),
          primaryKnockback = DataHandler_default.getWeapon(primary).knockback,
          knockback = primaryKnockback + 60,
          collisionScale =
            spikeCollider.collisionScale +
            nearestEnemySpikeCollider.collisionScale,
          collisionRangeTurret = collisionScale + knockback,
          isPrimaryEnough =
            distanceToSpike2 <= collisionScale + primaryKnockback;
        if (distanceToSpike2 <= collisionRangeTurret) {
          let hitRange =
            DataHandler_default.getWeapon(primary).range +
            nearestEnemySpikeCollider.hitScale;
          if (myPlayer.collidingSimple(nearestEnemySpikeCollider, hitRange)) {
            if (
              ((ModuleHandler.moduleActive = !0),
                (ModuleHandler.useAngle = angleToEnemy),
                (ModuleHandler.forceHat = 7),
                (ModuleHandler.forceWeapon = 0),
                (ModuleHandler.shouldAttack = !0),
                !isPrimaryEnough)
            ) {
              this.useTurret = !0;
            }
            this.client.StatsManager.knockbackTickTimes = 1;
          }
        }
      }
    }
  }

  class KnockbackTickHammer {
    moduleName = "knockbackTickHammer";
    client;
    targetEnemy = null;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client;
      if (
        ModuleHandler.moduleActive ||
        !Settings_default._knockbackTickHammer ||
        EnemyManager2.shouldIgnoreModule()
      ) {
        this.targetEnemy = null;
        return;
      }
      let {
        nearestEnemySpikeCollider: nearestEnemySpikeCollider,
        spikeCollider: spikeCollider,
      } = EnemyManager2,
        reloading = ModuleHandler.staticModules.reloading,
        primary = myPlayer.getItemByType(0),
        secondary = myPlayer.getItemByType(1),
        isHammer = secondary !== null && secondary !== 11,
        primaryReloaded = reloading.isReloaded(0),
        secondaryReloaded = reloading.isReloaded(1),
        turretReloaded = reloading.isReloaded(2),
        pos1 = myPlayer.pos.current;
      if (this.targetEnemy !== null) {
        let pos2 = this.targetEnemy.pos.current,
          angleToEnemy = pos1.angle(pos2);
        ((ModuleHandler.moduleActive = !0),
          (ModuleHandler.useAngle = angleToEnemy),
          (ModuleHandler.forceHat = 7),
          (ModuleHandler.forceWeapon = 0),
          (ModuleHandler.shouldAttack = !0),
          (this.targetEnemy = null),
          EnemyManager2.attemptSpikePlacement());
        return;
      }
      if (
        nearestEnemySpikeCollider !== null &&
        !nearestEnemySpikeCollider.isTrapped &&
        spikeCollider !== null &&
        isHammer &&
        primaryReloaded &&
        secondaryReloaded &&
        turretReloaded
      ) {
        let enemyPred = ReducedMovementSimulator.predict(nearestEnemySpikeCollider, 1, 16.66, myPlayer.pos.current),
          pos2 = new Vector(enemyPred.x, enemyPred.y),
          pos3 = spikeCollider.pos.current,
          angleToEnemy = pos1.angle(pos2),
          distanceToSpike2 = pos2.distance(pos3),
          { knockback: primaryKnockback, range: primaryRange } =
            DataHandler_default.getWeapon(primary),
          { knockback: secondaryKnockback, range: secondaryRange } =
            DataHandler_default.getWeapon(secondary),
          weaponRange =
            Math.min(primaryRange, secondaryRange) +
            nearestEnemySpikeCollider.hitScale,
          minKB = primaryKnockback + 60,
          maxKB = primaryKnockback + secondaryKnockback + 60,
          spikeRange =
            spikeCollider.collisionScale +
            nearestEnemySpikeCollider.collisionScale;
        if (
          inRange(distanceToSpike2, spikeRange + minKB, spikeRange + maxKB) &&
          myPlayer.collidingSimple(nearestEnemySpikeCollider, weaponRange)
        ) {
          let hitRange =
            DataHandler_default.getWeapon(secondary).range +
            nearestEnemySpikeCollider.hitScale;
          if (myPlayer.collidingSimple(nearestEnemySpikeCollider, hitRange)) {
            ((ModuleHandler.moduleActive = !0),
              (ModuleHandler.useAngle = angleToEnemy),
              (ModuleHandler.forceHat = 53),
              (ModuleHandler.forceWeapon = 1),
              (ModuleHandler.shouldAttack = !0),
              (this.targetEnemy = nearestEnemySpikeCollider),
              (this.client.StatsManager.knockbackTickHammerTimes = 1));
          }
        }
      }
    }
  }

  class KnockbackTickTrap {
    moduleName = "knockbackTickTrap";
    client;
    targetEnemy = null;
    useTurret = !1;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client;
      if (
        ModuleHandler.moduleActive ||
        !Settings_default._knockbackTickTrap ||
        EnemyManager2.shouldIgnoreModule()
      ) {
        ((this.targetEnemy = null), (this.useTurret = !1));
        return;
      }
      let {
        nearestEnemySpikeCollider: nearestEnemySpikeCollider,
        nearestTrappedEnemy: nearestTrappedEnemy,
        spikeCollider: spikeCollider,
      } = EnemyManager2,
        reloading = ModuleHandler.staticModules.reloading,
        primary = myPlayer.getItemByType(0),
        secondary = myPlayer.getItemByType(1),
        isHammer = secondary === 10,
        primaryReloaded = reloading.isReloaded(0),
        secondaryReloaded = reloading.isReloaded(1),
        turretReloaded = reloading.isReloaded(2);
      if (this.useTurret) {
        if (turretReloaded) {
          ((ModuleHandler.moduleActive = !0), (ModuleHandler.forceHat = 53));
        }
        this.useTurret = !1;
        return;
      }
      let pos1 = myPlayer.pos.current;
      if (this.targetEnemy !== null) {
        let pos2 = this.targetEnemy.pos.current,
          angleToEnemy = pos1.angle(pos2);
        ((ModuleHandler.moduleActive = !0),
          (ModuleHandler.useAngle = angleToEnemy),
          (ModuleHandler.forceHat = 7),
          (ModuleHandler.forceWeapon = 0),
          (ModuleHandler.shouldAttack = !0),
          (this.targetEnemy = null),
          (this.useTurret = !0));
        return;
      }
      if (
        nearestEnemySpikeCollider !== null &&
        nearestTrappedEnemy !== null &&
        nearestTrappedEnemy === nearestEnemySpikeCollider &&
        spikeCollider !== null &&
        isHammer &&
        primaryReloaded &&
        secondaryReloaded
      ) {
        let nearestTrap = nearestTrappedEnemy.trappedIn,
          hammer = DataHandler_default.getWeapon(secondary),
          playerRange = hammer.range + nearestTrappedEnemy.hitScale,
          trapRange = hammer.range + nearestTrap.hitScale,
          canAttackEnemy = myPlayer.collidingSimple(
            nearestTrappedEnemy,
            playerRange,
          ),
          canAttackTrap = myPlayer.collidingSimple(nearestTrap, trapRange),
          buildingDamage = myPlayer.getBuildingDamage(secondary, !0);
        if (
          !canAttackEnemy ||
          !canAttackTrap ||
          nearestTrap.health > buildingDamage
        ) {
          return;
        }
        let myPred = ReducedMovementSimulator.predict(myPlayer, 1, 16.66, nearestTrappedEnemy.pos.current, ModuleHandler.move_dir),
          enemyPred = ReducedMovementSimulator.predict(nearestTrappedEnemy, 1, 16.66, myPlayer.pos.current),
          pos12 = new Vector(myPred.x, myPred.y),
          pos2 = new Vector(enemyPred.x, enemyPred.y),
          pos3 = nearestTrap.pos.current,
          pos4 = spikeCollider.pos.current,
          angleToEnemy = pos12.angle(pos2),
          angleToTrap = pos12.angle(pos3),
          middleAngle = findMiddleAngle(angleToEnemy, angleToTrap),
          distanceToSpike2 = pos2.distance(pos4),
          turretKnockback = 60,
          knockback =
            DataHandler_default.getWeapon(primary).knockback + turretKnockback,
          collisionRange =
            spikeCollider.collisionScale +
            nearestEnemySpikeCollider.collisionScale +
            knockback;
        if (distanceToSpike2 <= collisionRange) {
          ((ModuleHandler.moduleActive = !0),
            (ModuleHandler.useAngle = middleAngle),
            (ModuleHandler.forceHat = 40),
            (ModuleHandler.forceWeapon = 1),
            (ModuleHandler.shouldAttack = !0),
            (this.targetEnemy = nearestTrappedEnemy),
            (this.client.StatsManager.knockbackTickTrapTimes = 1));
        }
      }
    }
  }

  class SpikeSync {
    moduleName = "spikeSync";
    client;
    useTurret = !1;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client;
      if (ModuleHandler.moduleActive || !Settings_default._spikeSync) {
        this.useTurret = !1;
        return;
      }
      let { nearestEnemy: nearest, nearestSpikePlacerAngle: placementAngles } =
        EnemyManager2,
        reloading = ModuleHandler.staticModules.reloading,
        primary = myPlayer.getItemByType(0),
        isPolearm = primary !== 8,
        primaryReloaded = reloading.isReloaded(0),
        turretReloaded = reloading.isReloaded(2);
      if (this.useTurret) {
        if (
          ((this.useTurret = !1),
            turretReloaded && !EnemyManager2.shouldIgnoreModule())
        ) {
          ((ModuleHandler.moduleActive = !0), (ModuleHandler.forceHat = 53));
        }
        return;
      }
      if (
        !EnemyManager2.shouldIgnoreModule() &&
        nearest !== null &&
        EnemyManager2.canSpikeSync &&
        placementAngles !== null &&
        isPolearm &&
        primaryReloaded
      ) {
        let range =
          DataHandler_default.getWeapon(primary).range + nearest.hitScale;
        if (!myPlayer.collidingSimple(nearest, range)) {
          return;
        }
        let pos1 = myPlayer.pos.current,
          pos2 = nearest.pos.current,
          angleTo = pos1.angle(pos2),
          itemType = 4;
        for (let angle of placementAngles) {
          ModuleHandler.place(itemType, angle);
        }
        ((ModuleHandler.placedOnce = !0),
          (ModuleHandler.placeAngles[0] = itemType),
          (ModuleHandler.placeAngles[1] = placementAngles),
          (ModuleHandler.moduleActive = !0),
          (ModuleHandler.useAngle = angleTo),
          (ModuleHandler.forceHat = 7),
          (ModuleHandler.forceWeapon = 0),
          (ModuleHandler.shouldAttack = !0),
          (this.client.StatsManager.spikeSyncTimes = 1),
          (this.useTurret = !0));
      }
    }
  }

  class SpikeSyncHammer {
    moduleName = "spikeSyncHammer";
    client;
    targetEnemy = null;
    useTurret = !1;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
        ObjectManager: ObjectManager2,
      } = this.client;
      if (
        ModuleHandler.moduleActive ||
        !Settings_default._spikeSyncHammer ||
        EnemyManager2.shouldIgnoreModule()
      ) {
        ((this.targetEnemy = null), (this.useTurret = !1));
        return;
      }
      let nearestSyncEnemy = EnemyManager2.nearestSyncEnemy,
        reloading = ModuleHandler.staticModules.reloading,
        primary = myPlayer.getItemByType(0),
        secondary = myPlayer.getItemByType(1),
        isPolearm = primary !== 8,
        isHammer = secondary === 10,
        primaryReloaded = reloading.isReloaded(0),
        secondaryReloaded = reloading.isReloaded(1),
        turretReloaded = reloading.isReloaded(2);
      if (this.useTurret) {
        if (turretReloaded) {
          ((ModuleHandler.moduleActive = !0), (ModuleHandler.forceHat = 53));
        }
        this.useTurret = !1;
        return;
      }
      if (this.targetEnemy !== null) {
        let nearest = this.targetEnemy,
          pos1 = myPlayer.pos.current,
          pos2 = nearest.pos.current,
          itemType = 4,
          spikeID = myPlayer.getItemByType(itemType),
          placeLength = myPlayer.getItemPlaceScale(spikeID),
          angleToNearest = pos1.angle(pos2),
          spikePos = pos1.addDirection(angleToNearest, placeLength),
          angleFromSpike = spikePos.angle(pos2),
          futureEnemyPos = spikePos.addDirection(angleFromSpike, 140),
          futureAngle = pos1.angle(futureEnemyPos),
          placementAngles = EnemyManager2.nearestSpikePlacerAngle;
        if (placementAngles !== null) {
          for (let angle of placementAngles) {
            ModuleHandler.place(itemType, angle);
          }
          ((ModuleHandler.placedOnce = !0),
            (ModuleHandler.placeAngles[0] = itemType),
            (ModuleHandler.placeAngles[1] = placementAngles),
            (ModuleHandler.moduleActive = !0),
            (ModuleHandler.useAngle = futureAngle),
            (ModuleHandler.forceHat = 7),
            (ModuleHandler.forceWeapon = 0),
            (ModuleHandler.shouldAttack = !0));
        }
        ((this.targetEnemy = null), (this.useTurret = !0));
        return;
      }
      if (
        nearestSyncEnemy !== null &&
        isPolearm &&
        primaryReloaded &&
        isHammer &&
        secondaryReloaded
      ) {
        let nearestLowHPObject = EnemyManager2.nearestLowHPObject;
        if (nearestLowHPObject === null) {
          return;
        }
        let hammer = DataHandler_default.getWeapon(secondary),
          playerRange = hammer.range + nearestSyncEnemy.hitScale,
          trapRange = hammer.range + nearestLowHPObject.hitScale,
          canAttackEnemy = myPlayer.collidingSimple(
            nearestSyncEnemy,
            playerRange,
          ),
          canAttackTrap = myPlayer.collidingSimple(
            nearestLowHPObject,
            trapRange,
          ),
          buildingDamage = myPlayer.getBuildingDamage(secondary, !0);
        if (
          !canAttackEnemy ||
          !canAttackTrap ||
          nearestLowHPObject.health > buildingDamage
        ) {
          return;
        }
        let itemType = 4,
          spikeID = myPlayer.getItemByType(itemType),
          placeLength = myPlayer.getItemPlaceScale(spikeID),
          pos1 = myPlayer.pos.current,
          pos2 = nearestSyncEnemy.pos.current,
          pos3 = nearestLowHPObject.pos.current,
          angleToEnemy = pos1.angle(pos2),
          angleToTrap = pos1.angle(pos3),
          middleAngle = findMiddleAngle(angleToEnemy, angleToTrap),
          angles = ObjectManager2.getBestPlacementAngles({
            position: pos1,
            id: spikeID,
            targetAngle: angleToEnemy,
            ignoreID: nearestLowHPObject.id,
            preplace: !1,
            reduce: !1,
            fill: !1,
          }),
          spikeScale = Items[spikeID].scale,
          possibleAngles = angles.filter((angle) => {
            let spikePos = pos1.addDirection(angle, placeLength),
              distance = pos2.distance(spikePos),
              range = nearestSyncEnemy.collisionScale + spikeScale;
            return distance <= range;
          });
        if (possibleAngles.length !== 0) {
          ((ModuleHandler.placeAngles[0] = itemType),
            (ModuleHandler.placeAngles[1] = possibleAngles),
            (ModuleHandler.moduleActive = !0),
            (ModuleHandler.useAngle = middleAngle),
            (ModuleHandler.forceHat = 40),
            (ModuleHandler.forceWeapon = 1),
            (ModuleHandler.shouldAttack = !0),
            (this.targetEnemy = nearestSyncEnemy),
            (this.client.StatsManager.spikeSyncHammerTimes = 1));
        }
      }
    }
  }

  class SpikeTick {
    moduleName = "spikeTick";
    client;
    useTurret = !1;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client;
      if (ModuleHandler.moduleActive || !Settings_default._spikeTick) {
        return;
      }
      let reloading = ModuleHandler.staticModules.reloading,
        primary = myPlayer.getItemByType(0),
        isPrimary = primary !== 8,
        primaryReloaded = reloading.isReloaded(0),
        turretReloaded = reloading.isReloaded(2),
        spikeCollider = EnemyManager2.enemySpikeCollider;
      if (this.useTurret) {
        if (((this.useTurret = !1), turretReloaded)) {
          ((ModuleHandler.moduleActive = !0), (ModuleHandler.forceHat = 53));
          return;
        }
      }
      if (
        EnemyManager2.shouldIgnoreModule() ||
        !isPrimary ||
        !primaryReloaded ||
        spikeCollider === null
      ) {
        return;
      }
      let range =
        DataHandler_default.getWeapon(primary).range + spikeCollider.hitScale;
      if (!myPlayer.collidingEntity(spikeCollider, range, !0)) {
        return;
      }
      let myPred = ReducedMovementSimulator.predict(myPlayer, 1, 16.66, spikeCollider.pos.current, ModuleHandler.move_dir),
        enemyPred = ReducedMovementSimulator.predict(spikeCollider, 1, 16.66, myPlayer.pos.current),
        pos1 = new Vector(myPred.x, myPred.y),
        pos2 = new Vector(enemyPred.x, enemyPred.y),
        angle = pos1.angle(pos2);
      ((ModuleHandler.moduleActive = !0),
        (ModuleHandler.useAngle = angle),
        (ModuleHandler.forceHat = 7),
        (ModuleHandler.forceWeapon = 0),
        (ModuleHandler.shouldAttack = !0));
      let spikeType = 4,
        spikeID = myPlayer.getItemByType(spikeType),
        placeLength = myPlayer.getItemPlaceScale(spikeID),
        spikeScale = Items[spikeID].scale,
        pos0 = myPlayer.pos.current,
        enemyPos = spikeCollider.pos.current,
        allAngles = this.client.ObjectManager.getBestPlacementAngles({
          position: pos0,
          id: spikeID,
          targetAngle: pos0.angle(enemyPos),
          ignoreID: null,
          preplace: !1,
          reduce: !0,
          fill: !0,
        }),
        touchingAngles = allAngles.filter((a) => {
          let spikePos = pos0.addDirection(a, placeLength),
            dist = enemyPos.distance(spikePos);
          return dist <= spikeScale + spikeCollider.collisionScale + 5;
        }).slice(0, spikeCollider.isTrapped ? 4 : 3);
      if (touchingAngles.length > 0) {
        ModuleHandler.placeAngles[0] = spikeType;
        ModuleHandler.placedOnce = !0;
        for (let a of touchingAngles) {
          ModuleHandler.place(spikeType, a);
          ModuleHandler.placeAngles[1].push(a);
        }
      } else {
        EnemyManager2.attemptSpikePlacement();
      }
      ((this.useTurret = !0),
        (this.client.StatsManager.spikeTickTimes = 1));
    }
  }

  const SpikeTick_default = SpikeTick;

  class ToolHammerSpearInsta {
    moduleName = "toolHammerSpearInsta";
    client;
    nearestTarget = null;
    useTurret = !1;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        myPlayer: myPlayer,
        EnemyManager: EnemyManager2,
      } = this.client;
      if (ModuleHandler.moduleActive || !Settings_default._toolSpearInsta) {
        this.nearestTarget = null;
        return;
      }
      let nearestEnemy = EnemyManager2.nearestEnemy;
      if (nearestEnemy === null || !ModuleHandler.canBuy(0, 7)) {
        return;
      }
      if (this.useTurret) {
        if (ModuleHandler.canBuy(0, 53)) {
          ((ModuleHandler.moduleActive = !0), (ModuleHandler.forceHat = 53));
        }
        this.useTurret = !1;
        return;
      }
      if (myPlayer.upgradeAge !== 2) {
        return;
      }
      let pos1 = myPlayer.pos.current;
      if (this.nearestTarget !== null) {
        let pos22 = this.nearestTarget.pos.current,
          angle2 = pos1.angle(pos22);
        ((ModuleHandler.moduleActive = !0),
          (ModuleHandler.useAngle = angle2),
          (ModuleHandler.forceHat = 7),
          (ModuleHandler.forceWeapon = 0),
          (ModuleHandler.shouldAttack = !0),
          ModuleHandler.upgradeItem(5),
          (this.nearestTarget = null),
          (this.useTurret = !0),
          EnemyManager2.attemptSpikePlacement());
        return;
      }
      let pos2 = nearestEnemy.pos.current,
        angle = pos1.angle(pos2),
        { reloading: reloading } = ModuleHandler.staticModules,
        primaryReloaded = reloading.isReloaded(0),
        turretReloaded = reloading.isReloaded(2),
        range = DataHandler_default.getWeapon(0).range + nearestEnemy.hitScale;
      if (
        !primaryReloaded ||
        !turretReloaded ||
        !myPlayer.collidingSimple(nearestEnemy, range)
      ) {
        return;
      }
      ((ModuleHandler.moduleActive = !0),
        (ModuleHandler.useAngle = angle),
        (ModuleHandler.forceHat = 7),
        (ModuleHandler.forceWeapon = 0),
        (ModuleHandler.shouldAttack = !0),
        (this.nearestTarget = nearestEnemy));
    }
  }

  class VelocityTick {
    moduleName = "velocityTick";
    client;
    nearestTarget = null;
    target = null;
    minKB = 220;
    maxKB = 245;
    constructor(client2) {
      this.client = client2;
    }
    isValidHat(hatID) {
      return hatID !== null && hatID !== 6 && hatID !== 22;
    }
    postTick() {
      let {
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
        ModuleHandler: ModuleHandler,
      } = this.client;
      if (
        ((this.target = null),
          ModuleHandler.moduleActive ||
          !Settings_default._velocityTick ||
          ModuleHandler.moveTo !== "disable" ||
          EnemyManager2.shouldIgnoreModule())
      ) {
        this.nearestTarget = null;
        return;
      }
      let { reloading: reloading } = ModuleHandler.staticModules,
        nearestEnemy = EnemyManager2.nearestEnemy,
        primary = myPlayer.getItemByType(0),
        isPolearm = primary === 5,
        isDiamond = myPlayer.getWeaponVariant(primary).current >= 2,
        isReloadedPrimary = reloading.isReloaded(0),
        isReloadedTurret = reloading.isReloaded(2);
      if (this.nearestTarget !== null) {
        let pos1 = myPlayer.pos.current,
          pos22 = this.nearestTarget.pos.current,
          angle2 = pos1.angle(pos22);
        ((ModuleHandler.moduleActive = !0),
          (ModuleHandler.useAngle = angle2),
          (ModuleHandler.forceHat = 7),
          (ModuleHandler.forceWeapon = 0),
          (ModuleHandler.shouldAttack = !0),
          (ModuleHandler.moveTo = angle2),
          (this.nearestTarget = null));
        return;
      }
      if (
        nearestEnemy === null ||
        !isPolearm ||
        !isDiamond ||
        !isReloadedPrimary ||
        !isReloadedTurret
      ) {
        return;
      }
      this.target = nearestEnemy;
      let pos0 = myPlayer.pos.current,
        pos2 = nearestEnemy.pos.future,
        distance = pos0.distance(pos2),
        angle = pos0.angle(pos2),
        { current: current } = nearestEnemy.weapon,
        type = DataHandler_default.getWeapon(current).type,
        almostReloaded =
          DataHandler_default.isMelee(current) && nearestEnemy.atExact(type, 1),
        detectFutureHat = this.isValidHat(nearestEnemy.futureHat),
        canSend = almostReloaded || detectFutureHat;
      if (inRange(distance, this.minKB, this.maxKB) && canSend) {
        ((ModuleHandler.moduleActive = !0),
          (ModuleHandler.forceHat = 53),
          (ModuleHandler.moveTo = angle),
          (this.nearestTarget = nearestEnemy),
          (this.client.StatsManager.velocityTickTimes = 1));
      }
    }
  }

  class Placer {
    moduleName = "placer";
    client;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let { ModuleHandler: ModuleHandler, myPlayer: myPlayer } = this.client,
        {
          currentType: currentType,
          placedOnce: placedOnce,
          healedOnce: healedOnce,
          currentAngle: currentAngle,
        } = ModuleHandler;
      if (!myPlayer.canPlace(currentType)) {
        return;
      }
      if (currentType === 2) {
        if (healedOnce) {
          return;
        }
        if (myPlayer.shameCount < 7) {
          (ModuleHandler.heal(),
            (ModuleHandler.healedOnce = !0),
            (ModuleHandler.didAntiInsta = !0));
        }
        return;
      }
      if (placedOnce) {
        return;
      }
      (ModuleHandler.place(currentType, currentAngle),
        (ModuleHandler.placedOnce = !0));
    }
  }

  const Placer_default = Placer;

  class PreAttack {
    moduleName = "preAttack";
    client;
    constructor(client2) {
      this.client = client2;
    }
    isReloadedByType(type) {
      let { weapon: weapon, staticModules: staticModules } =
        this.client.ModuleHandler,
        weaponType = type !== null ? type : weapon;
      return staticModules.reloading.isReloaded(weaponType);
    }
    postTick() {
      let { ModuleHandler: ModuleHandler } = this.client,
        {
          useWeapon: useWeapon,
          weapon: weapon,
          forceWeapon: forceWeapon,
        } = ModuleHandler,
        nextWeapon = forceWeapon !== null ? forceWeapon : useWeapon,
        forceReloaded = this.isReloadedByType(nextWeapon),
        canAttack =
          ModuleHandler.shouldAttack &&
          ((forceReloaded && this.isReloadedByType(weapon)) ||
            (forceWeapon !== null && forceReloaded));
      ModuleHandler.shouldAttack = canAttack;
    }
  }

  const PreAttack_default = PreAttack;

  class Reloading {
    moduleName = "reloading";
    client;
    clientReload = [{}, {}, {}];
    constructor(client2) {
      ((this.client = client2), this.reset());
    }
    reset() {
      let [primary, secondary, turret] = this.clientReload;
      ((primary.current = primary.max = 0),
        (secondary.current = secondary.max = 0),
        (turret.current = turret.max = 23));
    }
    get currentReload() {
      return this.clientReload[this.client.ModuleHandler.weapon];
    }
    getReload(type) {
      return this.clientReload[type];
    }
    updateMaxReload(type) {
      let {
        myPlayer: myPlayer,
        ModuleHandler: ModuleHandler,
        SocketManager: SocketManager2,
      } = this.client,
        reload = this.getReload(type),
        id = myPlayer.getItemByType(type),
        store2 = ModuleHandler.getHatStore(),
        pingAccount = Math.floor(SocketManager2.pong / SocketManager2.TICK),
        speed = myPlayer.getWeaponSpeed(id, store2.last) - pingAccount;
      ((reload.current = speed), (reload.max = speed));
    }
    resetReload(reload) {
      reload.current = -1;
    }
    resetByType(type) {
      this.resetReload(this.getReload(type));
    }
    isReloaded(type, ticks = 0) {
      let reload = this.clientReload[type];
      return reload.current >= reload.max - ticks;
    }
    isFasterThan(type1, type2) {
      let reload1 = this.clientReload[type1],
        reload2 = this.clientReload[type2],
        data1 = reload1.max - reload1.current,
        data2 = reload2.max - reload2.current;
      return Math.abs(data1) <= Math.abs(data2);
    }
    isEmptyReload(type) {
      return this.clientReload[type].current === 0;
    }
    postTick() {
      let { myPlayer: myPlayer } = this.client,
        primaryReload = myPlayer.reload[0].current,
        secondaryReload = myPlayer.reload[1].current;
      if (primaryReload !== -1) {
        this.clientReload[0].current = primaryReload;
      }
      if (secondaryReload !== -1) {
        this.clientReload[1].current = secondaryReload;
      }
      this.clientReload[2].current = myPlayer.reload[2].current;
    }
  }

  const Reloading_default = Reloading;

  class UpdateAngle {
    moduleName = "updateAngle";
    client;
    _smoothAngle = 0;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let { sentAngle: sentAngle, currentAngle: currentAngle } =
        this.client.ModuleHandler;
      if (sentAngle > 1) {
        return;
      }
      let smoothFactor = 0.35,
        diff = currentAngle - this._smoothAngle,
        wrapped = ((diff + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      if (Math.abs(wrapped) > 0.05) {
        this._smoothAngle += wrapped * smoothFactor;
        this._smoothAngle = ((this._smoothAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      } else {
        this._smoothAngle = currentAngle;
      }
      this.client.ModuleHandler.updateAngle(this._smoothAngle);
    }
  }

  const UpdateAngle_default = UpdateAngle;

  class UpdateAttack {
    moduleName = "updateAttack";
    client;
    didReset = !1;
    constructor(client2) {
      this.client = client2;
    }
    getAttackAngle() {
      let { useAngle: useAngle, currentAngle: currentAngle } =
        this.client.ModuleHandler;
      if (useAngle !== null) {
        return useAngle;
      }
      return currentAngle;
    }
    postTick() {
      let { ModuleHandler: ModuleHandler, myPlayer: myPlayer } = this.client,
        {
          useWeapon: useWeapon,
          forceWeapon: forceWeapon,
          weapon: weapon,
          attacking: attacking,
          useItem: useItem,
          sentAngle: sentAngle,
          staticModules: staticModules,
        } = ModuleHandler,
        { reloading: reloading } = staticModules,
        nextWeapon = forceWeapon !== null ? forceWeapon : useWeapon;
      if (
        nextWeapon !== null &&
        (nextWeapon !== weapon ||
          ModuleHandler.currentHolding !== nextWeapon ||
          myPlayer.currentItem !== -1)
      ) {
        if (reloading.isReloaded(weapon) || forceWeapon !== null) {
          ModuleHandler.whichWeapon(nextWeapon);
        }
      }
      if (useItem !== null) {
        ModuleHandler.selectItem(useItem);
      }
      if (ModuleHandler.shouldAttack) {
        let angle = this.getAttackAngle();
        (ModuleHandler.attack(angle), ModuleHandler.stopAttack());
        let weaponType = ModuleHandler.weapon;
        if (ModuleHandler.attacked) {
          reloading.updateMaxReload(weaponType);
        }
        reloading.resetByType(weaponType);
      } else if (!attacking && sentAngle !== 0) {
        (ModuleHandler.stopAttack(), (this.didReset = !0));
      } else if (this.didReset) {
        ((this.didReset = !1), ModuleHandler.stopAttack());
      }
    }
  }

  const UpdateAttack_default = UpdateAttack;

  class UseAttacking {
    moduleName = "useAttacking";
    client;
    constructor(client2) {
      this.client = client2;
    }
    getWeaponType() {
      let {
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
        ModuleHandler: ModuleHandler,
      } = this.client,
        pos1 = myPlayer.pos.future,
        nearestEntity = EnemyManager2.nearestEntity,
        nearestObject = EnemyManager2.nearestObject,
        primaryID = myPlayer.getItemByType(0),
        secondaryID = myPlayer.getItemByType(1),
        range = DataHandler_default.getWeapon(primaryID).range;
      if (nearestEntity !== null) {
        let pos2 = nearestEntity.pos.future,
          angle = pos1.angle(pos2);
        if (
          myPlayer.collidingEntity(
            nearestEntity,
            range + nearestEntity.hitScale,
          )
        ) {
          return [0, angle];
        }
        if (
          DataHandler_default.isShootable(secondaryID) &&
          !ModuleHandler.autoattack
        ) {
          return [1, angle];
        }
      }
      if (nearestObject === null) {
        return null;
      }
      if (myPlayer.colliding(nearestObject, range + nearestObject.hitScale)) {
        return [0, null];
      }
      return null;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client;
      if (
        ModuleHandler.moduleActive ||
        ModuleHandler.attackingState !== 1 ||
        ModuleHandler.forceWeapon !== null
      ) {
        return;
      }
      let weaponType = this.getWeaponType();
      if (weaponType === null) {
        return;
      }
      let [type, angle] = weaponType;
      if (((ModuleHandler.forceWeapon = type), angle !== null)) {
        ModuleHandler.useAngle = angle;
      }
      ModuleHandler.shouldAttack = !0;
    }
  }

  class UseDestroying {
    moduleName = "useDestroying";
    client;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        myPlayer: myPlayer,
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
      } = this.client;
      if (
        ModuleHandler.moduleActive ||
        ModuleHandler.attackingState !== 2 ||
        ModuleHandler.forceWeapon !== null
      ) {
        return;
      }
      let nearestObject = EnemyManager2.nearestPlayerObject,
        type = myPlayer.getBestDestroyingWeapon(nearestObject);
      ((ModuleHandler.forceWeapon = type), (ModuleHandler.shouldAttack = !0));
    }
  }

  class UseFastest {
    moduleName = "useFastest";
    client;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let { myPlayer: myPlayer, ModuleHandler: ModuleHandler } = this.client;
      if (ModuleHandler.moduleActive) {
        return;
      }
      let { reloading: reloading } = ModuleHandler.staticModules,
        type = myPlayer.getFastestWeapon(),
        reverse_type = type === 0 ? 1 : 0;
      if (!reloading.isReloaded(type)) {
        ModuleHandler.useWeapon = type;
      } else if (
        !reloading.isReloaded(reverse_type) &&
        myPlayer.getItemByType(reverse_type) !== null
      ) {
        ModuleHandler.useWeapon = reverse_type;
      } else {
        ModuleHandler.useWeapon = type;
      }
    }
  }

  class UtilityHat {
    moduleName = "utilityHat";
    client;
    constructor(client2) {
      this.client = client2;
    }
    getBestUtilityHat(weaponType) {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client,
        id = myPlayer.getItemByType(weaponType);
      if (id === 11) {
        return null;
      }
      if (DataHandler_default.isShootable(id)) {
        return ((ModuleHandler.canHitEntity = !0), 20);
      }
      let weapon = DataHandler_default.getWeapon(id),
        range = weapon.range;
      if (weapon.damage <= 1) {
        return null;
      }
      if (ModuleHandler.attackingState === 1) {
        let nearest = EnemyManager2.nearestEntity;
        if (
          nearest !== null &&
          myPlayer.collidingEntity(nearest, range + nearest.hitScale)
        ) {
          return ((ModuleHandler.canHitEntity = !0), 7);
        }
      }
      if (ModuleHandler.attackingState !== 0) {
        let nearestObject = EnemyManager2.nearestPlayerObject;
        if (nearestObject === null) {
          return null;
        }
        if (myPlayer.colliding(nearestObject, range + nearestObject.hitScale)) {
          return 40;
        }
      }
      return null;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client;
      if (ModuleHandler.moduleActive) {
        return;
      }
      let {
        forceWeapon: forceWeapon,
        useWeapon: useWeapon,
        weapon: weapon,
      } = ModuleHandler,
        weaponType =
          forceWeapon !== null
            ? forceWeapon
            : useWeapon !== null
              ? useWeapon
              : weapon,
        hat = this.getBestUtilityHat(weaponType),
        { reloading: reloading } = ModuleHandler.staticModules,
        isReloaded = reloading.isReloaded(weaponType),
        isEmptyReload = reloading.isEmptyReload(weaponType),
        turretReloaded = reloading.isReloaded(2);
      if (!isReloaded) {
        hat = null;
      }
      if (ModuleHandler.canHitEntity && isEmptyReload && turretReloaded) {
        let nearest = EnemyManager2.nearestEntity;
        if (nearest !== null && myPlayer.collidingEntity(nearest, 700)) {
          hat = 53;
        }
      }
      if (hat !== null) {
        ModuleHandler.useHat = hat;
      }
    }
  }

  class AntiInsta {
    moduleName = "antiInsta";
    client;
    toggleAnti = !1;
    healingCount = 0;
    antiTimer = 0;
    constructor(client2) {
      this.client = client2;
    }
    isSaveHealTime() {
      let { myPlayer: myPlayer, SocketManager: SocketManager2 } = this.client,
        startHit = myPlayer.receivedDamage || 0;
      return Date.now() - startHit + SocketManager2.pong >= 125;
    }
    isSaveHealTick() {
      let { tickCount: tickCount, damageTick: damageTick } =
        this.client.myPlayer;
      return tickCount - damageTick > 0;
    }
    isSaveHeal() {
      return this.isSaveHealTime();
    }
    postTick() {
      if (!Settings_default._autoheal) {
        return;
      }
      let {
        myPlayer: myPlayer,
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        ProjectileManager: ProjectileManager2,
        ObjectManager: ObjectManager2,
      } = this.client;
      if (myPlayer.shameActive) {
        return;
      }
      let foodID = myPlayer.getItemByType(2),
        restore = Items[foodID].restore,
        needTimes = Math.ceil(
          (myPlayer.maxHealth - myPlayer.tempHealth) / restore,
        ),
        healingTimes = null,
        forceHeal = !1,
        damageIfSoldier = EnemyManager2.potentialDamage * Hats[6].dmgMult,
        recentBurstHit = myPlayer.receivedDamage >= 25 && myPlayer.tickCount - myPlayer.damageTick <= 1,
        fatalWithSoldier = damageIfSoldier >= myPlayer.currentHealth,
        heavyPressure = EnemyManager2.potentialDamage >= myPlayer.currentHealth * 0.9;
      if (
        EnemyManager2.velocityTickThreat ||
        EnemyManager2.reverseInsta ||
        EnemyManager2.rangedBowInsta ||
        EnemyManager2.detectedDangerEnemy ||
        EnemyManager2.detectedEnemy ||
        myPlayer.tempHealth <= 20 ||
        (ModuleHandler.shouldEquipSoldier && ModuleHandler.forceHat !== 6) ||
        EnemyManager2.dangerWithoutSoldier
      ) {
        forceHeal = !0;
      }
      if ((recentBurstHit && fatalWithSoldier) || (myPlayer.receivedDamage >= 40 && fatalWithSoldier)) {
        forceHeal = !0;
      }
      if (forceHeal) {
        ModuleHandler.shouldEquipSoldier = !0;
        ModuleHandler.forceHat = 6;
        this.antiTimer = myPlayer.tickCount;
      }
      if (myPlayer.shameCount < 5 && forceHeal && myPlayer.tempHealth < 90) {
        ((ModuleHandler.didAntiInsta = !0), (healingTimes = Math.max(3, needTimes || 1)));
      } else if (myPlayer.shameCount < 5 && myPlayer.tickCount - this.antiTimer <= 1 && myPlayer.tempHealth < 92) {
        ((ModuleHandler.didAntiInsta = !0), (healingTimes = Math.max(2, needTimes || 1)));
      } else if (this.isSaveHeal() && myPlayer.tempHealth < 100) {
        healingTimes = needTimes || 1;
      }
      if (healingTimes !== null) {
        ModuleHandler.healedOnce = !0;
        for (let i = 0; i <= healingTimes; i++) {
          ModuleHandler.heal();
        }
      }
    }
  }

  const AntiInsta_default = AntiInsta;

  class Autohat {
    moduleName = "autoHat";
    client;
    constructor(client2) {
      this.client = client2;
    }
    handleEquip(type, use) {
      let { ModuleHandler: ModuleHandler } = this.client;
      if (type === 0 && ModuleHandler.forceHat !== null) {
        use = ModuleHandler.forceHat;
      }
      if (use !== null && ModuleHandler.equip(type, use)) {
        return !0;
      }
      return !1;
    }
    postTick() {
      let { ModuleHandler: ModuleHandler } = this.client;
      if (!ModuleHandler.sentHatEquip) {
        this.handleEquip(0, ModuleHandler.useHat);
      }
      if (!ModuleHandler.sentAccEquip && !ModuleHandler.sentHatEquip) {
        this.handleEquip(1, ModuleHandler.useAcc);
      }
    }
  }

  const Autohat_default = Autohat;

  class DefaultAcc {
    moduleName = "defaultAcc";
    client;
    constructor(client2) {
      this.client = client2;
    }
    shouldUseTail() {
      let { ModuleHandler: ModuleHandler, myPlayer: myPlayer } = this.client,
        { reloading: reloading } = ModuleHandler.staticModules,
        primary = myPlayer.getItemByType(0),
        secondary = myPlayer.getItemByType(1);
      return (
        (DataHandler_default.isMelee(primary) &&
          primary !== 8 &&
          !reloading.isReloaded(0, 2)) ||
        (DataHandler_default.isMelee(secondary) && !reloading.isReloaded(1, 2))
      );
    }
    getBestCurrentAcc() {
      let { ModuleHandler: ModuleHandler, EnemyManager: EnemyManager2 } =
        this.client,
        { actual: actual } = ModuleHandler.getAccStore(),
        useCorrupt = ModuleHandler.canBuy(1, 21),
        useShadow = ModuleHandler.canBuy(1, 19),
        useTail = ModuleHandler.canBuy(1, 11),
        useActual = ModuleHandler.canBuy(1, actual);
      if (
        EnemyManager2.detectedEnemy ||
        EnemyManager2.nearestEnemyInRangeOf(300, EnemyManager2.nearestEntity)
      ) {
        if (
          EnemyManager2.nearestEntity === EnemyManager2.nearestEnemy &&
          useCorrupt &&
          Settings_default._antienemy
        ) {
          return 21;
        }
        if (useShadow) {
          return 19;
        }
        if (useActual && actual !== 11) {
          return actual;
        }
        return 0;
      }
      if (useTail) {
        return 11;
      }
      return 0;
    }
    postTick() {
      let { ModuleHandler: ModuleHandler } = this.client,
        acc = this.getBestCurrentAcc();
      ModuleHandler.useAcc = acc;
    }
  }

  class DefaultHat {
    moduleName = "defaultHat";
    client;
    platformActivated = !1;
    constructor(client2) {
      this.client = client2;
    }
    getBestCurrentHat() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client,
        { current: current, future: future } = myPlayer.pos,
        { actual: actual } = ModuleHandler.getHatStore(),
        useFlipper = ModuleHandler.canBuy(0, 31),
        useSoldier = ModuleHandler.canBuy(0, 6),
        useWinter = ModuleHandler.canBuy(0, 15),
        useActual = ModuleHandler.canBuy(0, actual),
        useBooster = ModuleHandler.canBuy(0, 12),
        useBull = ModuleHandler.canBuy(0, 7),
        useEmp = ModuleHandler.canBuy(0, 22);
      if (
        useActual &&
        !ModuleHandler.isMoving &&
        myPlayer.speed <= 5 &&
        actual !== 0
      ) {
        return actual;
      }
      if (useSoldier) {
        if (Settings_default._antienemy) {
          if (
            EnemyManager2.detectedDangerEnemy ||
            EnemyManager2.detectedEnemy ||
            EnemyManager2.velocityTickThreat ||
            EnemyManager2.reverseInsta ||
            EnemyManager2.rangedBowInsta
          ) {
            return (
              (ModuleHandler.shouldEquipSoldier = !0),
              (ModuleHandler.forceHat = 6),
              6
            );
          }
          if (
            (useBull && myPlayer.shameCount > 0) ||
            EnemyManager2.dangerWithoutSoldier
          ) {
            return 6;
          }
        }
        if (Settings_default._antispike && EnemyManager2.willCollideSpike) {
          return 6;
        }
      }
      if (Settings_default._biomehats && useFlipper) {
        if (pointInRiver(current) || pointInRiver(future)) {
          return 31;
        }
      }
      if (useSoldier) {
        if (
          Settings_default._antianimal &&
          EnemyManager2.nearestDangerAnimal !== null
        ) {
          return 6;
        }
      }
      if (
        useEmp &&
        Settings_default._empDefense &&
        (!ModuleHandler.isMoving || myPlayer.speed <= 5)
      ) {
        return 22;
      }
      if (Settings_default._biomehats && useWinter) {
        if (current.y <= 2400 || future.y <= 2400) {
          return 15;
        }
      }
      if (useBooster) {
        return 12;
      }
      return 0;
    }
    postTick() {
      let { ModuleHandler: ModuleHandler } = this.client,
        hat = this.getBestCurrentHat();
      ModuleHandler.useHat = hat;
    }
  }

  class SafeWalk {
    moduleName = "safeWalk";
    client;
    movingState = !1;
    constructor(client2) {
      this.client = client2;
    }
    reset() {
      this.movingState = !1;
    }
    willGetHit(angle, speed, target) {
      if (angle === null || !Settings_default._safeWalk) {
        return !1;
      }
      let { myPlayer: myPlayer } = this.client,
        nearestCollider = target;
      if (nearestCollider === null) {
        return !1;
      }
      let distance = Vector_default.fromAngle(angle, speed + myPlayer.speed / 4)
        .add(myPlayer.pos.current)
        .distance(nearestCollider.pos.current),
        range = myPlayer.collisionScale + nearestCollider.collisionScale;
      if (distance > range) {
        return !1;
      }
      return !0;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        myPlayer: myPlayer,
        ObjectManager: ObjectManager2,
        EnemyManager: EnemyManager2,
      } = this.client,
        { prevMoveTo: prevMoveTo, moveTo: moveTo } = ModuleHandler;
      if (prevMoveTo !== moveTo) {
        let angle = moveTo === "disable" ? ModuleHandler.move_dir : moveTo;
        ModuleHandler.startMovement(angle, !0);
        return;
      }
      let offset = myPlayer.speed + 45;
      if (
        this.willGetHit(
          ModuleHandler.move_dir,
          offset,
          EnemyManager2.nearestCollider,
        ) ||
        this.willGetHit(
          ModuleHandler.move_dir,
          offset,
          EnemyManager2.secondNearestCollider,
        )
      ) {
        if (!this.movingState) {
          ((this.movingState = !0), ModuleHandler.stopMovement());
        }
        return;
      }
      if (this.movingState) {
        ((this.movingState = !1), ModuleHandler.startMovement());
      }
    }
  }

  class ShameReset {
    moduleName = "shameReset";
    client;
    tickToggle = !1;
    constructor(client2) {
      this.client = client2;
    }
    isBullTickTime() {
      let { myPlayer: myPlayer } = this.client;
      return (
        !myPlayer.shameActive &&
        myPlayer.shameCount > 0 &&
        myPlayer.poisonCount === 0 &&
        myPlayer.isBullTickTime()
      );
    }
    get shouldReset() {
      let { ModuleHandler: ModuleHandler } = this.client;
      return this.isBullTickTime() && ModuleHandler.canBuy(0, 7);
    }
    notSave() {
      let {
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
        ModuleHandler: ModuleHandler,
      } = this.client;
      return (
        ModuleHandler.forceHat === 40 ||
        EnemyManager2.instaThreat() ||
        EnemyManager2.collidingSpike ||
        myPlayer.wasTrapped() ||
        ModuleHandler.currentType === 2
      );
    }
    postTick() {
      let { ModuleHandler: ModuleHandler } = this.client;
      if (!this.notSave() && (this.shouldReset || this.tickToggle)) {
        ((this.tickToggle = !0),
          (ModuleHandler.moduleActive = !0),
          (ModuleHandler.forceHat = 7));
      }
    }
    healthUpdate() {
      if (this.client.myPlayer.isDmgOverTime) {
        this.tickToggle = !1;
      }
    }
  }

  const ShameReset_default = ShameReset;

  class AutoAccept {
    moduleName = "autoAccept";
    client;
    prevClan = null;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        myPlayer: myPlayer,
        clientIDList: clientIDList,
        PacketManager: PacketManager2,
        isOwner: isOwner,
      } = this.client,
        currentClan = myPlayer.clanName;
      if (currentClan !== this.prevClan) {
        ((this.prevClan = currentClan),
          (myPlayer.joinRequests.length = 0),
          this.client.pendingJoins.clear());
      }
      if (!myPlayer.isLeader || myPlayer.joinRequests.length === 0) {
        return;
      }
      let id = myPlayer.joinRequests[0][0];
      if (Settings_default._autoaccept || this.client.pendingJoins.size !== 0) {
        if (
          (PacketManager2.clanRequest(
            id,
            Settings_default._autoaccept || clientIDList.has(id),
          ),
            myPlayer.joinRequests.shift(),
            this.client.pendingJoins.delete(id),
            isOwner)
        ) {
          GameUI_default.clearNotication();
        }
      }
      let nextID = myPlayer.joinRequests[0];
      if (isOwner && nextID !== void 0) {
        GameUI_default.createRequest(nextID);
      }
    }
  }

  const AutoAccept_default = AutoAccept;

  class AutoBuy {
    moduleName = "autoBuy";
    client;
    buyIndex = 0;
    buyList = [
      [1, 11],
      [0, 12],
      [0, 7],
      [0, 6],
      [0, 40],
      [0, 53],
      [1, 21],
      [0, 11],
      [1, 19],
      [0, 15],
      [0, 31],
      [0, 20],
      [0, 22],
    ];
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let { ModuleHandler: ModuleHandler, myPlayer: myPlayer } = this.client;
      if (this.buyIndex >= this.buyList.length || !myPlayer.isSandbox) {
        return;
      }
      let [type, id] = this.buyList[this.buyIndex];
      if (ModuleHandler.canBuy(type, id)) {
        ModuleHandler.buy(type, id);
      }
      if (ModuleHandler.bought[type].has(id)) {
        this.buyIndex += 1;
      }
    }
  }

  class AutoGrind {
    moduleName = "autoGrind";
    client;
    constructor(client2) {
      this.client = client2;
    }
    isFullyUpgraded() {
      let { myPlayer: myPlayer } = this.client,
        primary = myPlayer.getItemByType(0),
        secondary = myPlayer.getItemByType(1),
        upgradedSecondary =
          secondary === 10 && myPlayer.getWeaponVariant(secondary).current >= 1,
        upgradedPrimary =
          primary !== 8 && myPlayer.getWeaponVariant(primary).current >= 2;
      return upgradedSecondary && upgradedPrimary;
    }
    getGrindWeapon() {
      let {
        myPlayer: myPlayer,
        EnemyManager: EnemyManager2,
        ModuleHandler: ModuleHandler,
      } = this.client,
        nearestObject = EnemyManager2.nearestPlayerObject,
        secondNearestObject = EnemyManager2.secondNearestPlayerObject;
      if (nearestObject === null) {
        return null;
      }
      let primary = myPlayer.getItemByType(0),
        secondary = myPlayer.getItemByType(1);
      if (secondary === 10) {
        if (myPlayer.getWeaponVariant(secondary).current < 1) {
          return 1;
        }
        let useTank = ModuleHandler.canBuy(0, 40),
          damage = myPlayer.getBuildingDamage(10, useTank),
          range = DataHandler_default.getWeapon(secondary).range,
          canHit1 =
            myPlayer.colliding(nearestObject, range + nearestObject.hitScale) &&
            nearestObject.health > damage,
          canHit2 =
            secondNearestObject !== null &&
            myPlayer.colliding(
              secondNearestObject,
              range + secondNearestObject.hitScale,
            ) &&
            secondNearestObject.health > damage;
        if (canHit1 && canHit2) {
          return 1;
        }
      }
      if (primary !== 8 && myPlayer.getWeaponVariant(primary).current < 2) {
        return 0;
      }
      return null;
    }
    placeTurret(angle) {
      let {
        myPlayer: myPlayer,
        ObjectManager: ObjectManager2,
        ModuleHandler: ModuleHandler,
      } = this.client,
        id = myPlayer.getItemByType(8),
        position = myPlayer.getPlacePosition(myPlayer.pos.future, id, angle);
      if (!ObjectManager2.canPlaceItem(id, position)) {
        return !1;
      }
      let type = 8;
      return (
        ModuleHandler.place(type, angle),
        (ModuleHandler.placedOnce = !0),
        (ModuleHandler.placeAngles[0] = 8),
        ModuleHandler.placeAngles[1].push(angle),
        !0
      );
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client;
      if (
        !Settings_default._autoGrind ||
        ModuleHandler.moduleActive ||
        ModuleHandler.placedOnce ||
        ModuleHandler.healedOnce ||
        ModuleHandler.isMoving ||
        myPlayer.speed > 5 ||
        this.isFullyUpgraded()
      ) {
        return;
      }
      let { autoMill: autoMill, reloading: reloading } =
        ModuleHandler.staticModules;
      if (autoMill.isActive) {
        return;
      }
      let farmItem = myPlayer.getItemByType(8);
      if (farmItem !== 17 && farmItem !== 22) {
        return;
      }
      let nearestEnemy = EnemyManager2.nearestEnemy;
      if (
        nearestEnemy !== null &&
        myPlayer.collidingSimple(nearestEnemy, 400)
      ) {
        return;
      }
      let itemType = 8;
      if (!myPlayer.canPlace(itemType)) {
        return;
      }
      let item = DataHandler_default.getItem(farmItem),
        distance = myPlayer.getItemPlaceScale(item.id),
        angle = ModuleHandler.currentAngle,
        angleBetween = Math.asin((2 * item.scale + 15) / (2 * distance));
      (this.placeTurret(angle - angleBetween),
        this.placeTurret(angle + angleBetween));
      let {
        nearestPlayerObject: nearestObject,
        secondNearestPlayerObject: secondNearestObject,
      } = EnemyManager2;
      if (
        nearestObject === null ||
        (nearestObject.type !== 17 && nearestObject.type !== 22)
      ) {
        return;
      }
      let pos1 = myPlayer.pos.current,
        tempAngle = pos1.angle(nearestObject.pos.current),
        weaponType = this.getGrindWeapon();
      if (weaponType === null) {
        return;
      }
      let weapon = myPlayer.getItemByType(weaponType);
      if (
        secondNearestObject !== null &&
        nearestObject !== secondNearestObject
      ) {
        let pos3 = secondNearestObject.pos.current,
          distance2 = pos1.distance(pos3),
          range =
            DataHandler_default.getWeapon(weapon).range +
            secondNearestObject.hitScale,
          angle2 = pos1.angle(pos3),
          middleAngle = findMiddleAngle(tempAngle, angle2);
        if (
          distance2 <= range &&
          getAngleDist(tempAngle, middleAngle) <= Config_default.gatherAngle &&
          getAngleDist(angle2, middleAngle) <= Config_default.gatherAngle
        ) {
          tempAngle = middleAngle;
        }
      }
      if (reloading.isReloaded(weaponType)) {
        ((ModuleHandler.moduleActive = !0),
          (ModuleHandler.useAngle = tempAngle),
          (ModuleHandler.useHat = 40),
          (ModuleHandler.forceWeapon = weaponType),
          (ModuleHandler.shouldAttack = !0));
      }
    }
  }

  class Automill {
    moduleName = "autoMill";
    toggle = !1;
    active = !0;
    client;
    tickCount = 0;
    constructor(client2) {
      this.client = client2;
    }
    get isActive() {
      return this.toggle && this.active;
    }
    reset() {
      this.active = !0;
    }
    get canAutomill() {
      let isOwner = this.client.isOwner,
        { attacking: attacking, placedOnce: placedOnce } =
          this.client.ModuleHandler;
      return (
        Settings_default._automill &&
        this.client.myPlayer.isSandbox &&
        !placedOnce &&
        (!isOwner || !attacking) &&
        this.active
      );
    }
    canPlaceWindmill(angle) {
      return this.client.myPlayer.canPlaceObject(5, angle);
    }
    placeWindmill(angle) {
      let { ModuleHandler: ModuleHandler } = this.client,
        type = 5;
      (ModuleHandler.place(type, angle),
        (ModuleHandler.placedOnce = !0),
        (ModuleHandler.placeAngles[0] = type),
        ModuleHandler.placeAngles[1].push(angle));
    }
    postTick() {
      let { myPlayer: myPlayer, ModuleHandler: ModuleHandler } = this.client;
      if (((this.toggle = !0), !this.canAutomill)) {
        this.toggle = !1;
        return;
      }
      if (!myPlayer.canPlace(5)) {
        ((this.toggle = !1), (this.active = !1));
        return;
      }
      let angle = ModuleHandler.reverse_move_dir;
      if (angle === null) {
        return;
      }
      let item = Items[myPlayer.getItemByType(5)],
        distance = myPlayer.getItemPlaceScale(item.id),
        offset = Math.asin((2 * item.scale + 9e-13) / (2 * distance)) * 2,
        leftAngle = angle - offset,
        rightAngle = angle + offset;
      if (
        this.canPlaceWindmill(angle) &&
        this.canPlaceWindmill(leftAngle) &&
        this.canPlaceWindmill(rightAngle)
      ) {
        (this.placeWindmill(angle),
          this.placeWindmill(leftAngle),
          this.placeWindmill(rightAngle));
      }
    }
  }

  const Automill_default = Automill;

  class AutoSteal {
    moduleName = "autoSteal";
    client;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client;
      if (ModuleHandler.moduleActive || !Settings_default._autoSteal) {
        return;
      }
      let nearestLowEntity = EnemyManager2.nearestLowEntity;
      if (nearestLowEntity === null) {
        return;
      }
      let { reloading: reloading } = ModuleHandler.staticModules,
        primary = myPlayer.getItemByType(0),
        range =
          DataHandler_default.getWeapon(primary).range +
          nearestLowEntity.hitScale;
      if (
        !myPlayer.collidingSimple(nearestLowEntity, range) ||
        !reloading.isReloaded(0)
      ) {
        return;
      }
      let canUseBull = ModuleHandler.canBuy(0, 7),
        pos1 = myPlayer.pos.current,
        pos2 = nearestLowEntity.pos.current,
        angle = pos1.angle(pos2),
        maxDamageBull = myPlayer.getMaxWeaponDamage(primary, !1, canUseBull),
        maxDamage = myPlayer.getMaxWeaponDamage(primary, !1, !1);
      if (!(maxDamageBull >= nearestLowEntity.currentHealth)) {
        return;
      }
      if (
        ((ModuleHandler.moduleActive = !0),
          (ModuleHandler.useAngle = angle),
          maxDamage < nearestLowEntity.currentHealth)
      ) {
        ModuleHandler.forceHat = 7;
      }
      ((ModuleHandler.forceWeapon = 0), (ModuleHandler.shouldAttack = !0));
    }
  }

  class AutoPush {
    moduleName = "autoPush";
    client;
    pushPos = null;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
        ModuleHandler: ModuleHandler,
        ObjectManager: ObjectManager2,
        PlayerManager: PlayerManager2,
      } = this.client;
      this.pushPos = null;
      let {
        nearestEnemyPush: nearestEnemyPush,
        nearestPushSpike: nearestPushSpike,
      } = EnemyManager2;
      if (
        ((EnemyManager2.nearestEnemyPush = null),
          (EnemyManager2.nearestPushSpike = null),
          ModuleHandler.moduleActive ||
          !Settings_default._autoPush ||
          ModuleHandler.moveTo !== "disable")
      ) {
        return;
      }
      if (nearestEnemyPush === null || nearestPushSpike === null) {
        return;
      }
      if (nearestEnemyPush.trappedIn === null || myPlayer.trappedIn) {
        return;
      }
      let pos0 = myPlayer.pos.current,
        pos1 = nearestEnemyPush.pos.current,
        pos2 = nearestPushSpike.pos.current;
      if (
        !myPlayer.collidingSimple(nearestEnemyPush, 250) ||
        nearestEnemyPush.colliding(
          nearestPushSpike,
          nearestEnemyPush.collisionScale + nearestPushSpike.collisionScale + 1,
        )
      ) {
        return;
      }
      let distanceFromSpikeToEnemy = pos2.distance(pos1),
        angleFromSpikeToEnemy = pos2.angle(pos1),
        angleToEnemy = pos0.angle(pos1),
        angleToSpike = pos0.angle(pos2),
        distanceToSpike = pos0.distance(pos2),
        pushPos = pos2.addDirection(
          angleFromSpikeToEnemy,
          distanceFromSpikeToEnemy + nearestEnemyPush.collisionScale + 7,
        ),
        objectIDs = ObjectManager2.grid2D.queryFull(pushPos.x, pushPos.y, 1);
      for (let id of objectIDs) {
        let object = ObjectManager2.objects.get(id);
        if (PlayerManager2.canMoveOnTop(object)) {
          continue;
        }
        let pos = object.pos.current,
          distance = pushPos.distance(pos),
          playerScale = myPlayer.collisionScale * 1.3,
          range = object.collisionScale + playerScale;
        if (distance <= range) {
          return;
        }
      }
      ((this.pushPos = pos2.addDirection(
        angleFromSpikeToEnemy,
        distanceFromSpikeToEnemy + 250,
      )),
        (ModuleHandler.moveTo = pos0.angle(this.pushPos)),
        (EnemyManager2.nearestEnemyPush = nearestEnemyPush),
        (EnemyManager2.nearestPushSpike = nearestPushSpike));
      let activationScale2 = nearestEnemyPush.collisionScale * 3.2,
        offset2 = Math.asin((2 * activationScale2) / (2 * distanceToSpike));
      if (!(getAngleDist(angleToEnemy, angleToSpike) <= offset2)) {
        return;
      }
      ((this.pushPos = pushPos),
        (ModuleHandler.moveTo = pos0.angle(this.pushPos)));
    }
  }

  class AutoPlay {
    moduleName = "autoPlay";
    client;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      if (!Settings_default._autoplay) {
        return;
      }
      let {
          myPlayer: myPlayer,
          EnemyManager: EnemyManager2,
          ObjectManager: ObjectManager2,
          ModuleHandler: ModuleHandler,
        } = this.client,
        nearestEnemy = EnemyManager2.nearestEnemy;
      if (!nearestEnemy || ModuleHandler.moduleActive) {
        return;
      }
      let nearestTrap = null,
        bestDist = Infinity;
      for (let [, object] of ObjectManager2.objects) {
        if (!(object instanceof PlayerObject) || object.type !== 15) continue;
        if (this.client.PlayerManager.isEnemyByID(object.ownerID, myPlayer)) continue;
        let d = object.pos.current.distance(nearestEnemy.pos.current);
        if (d < bestDist && d <= 280) {
          bestDist = d;
          nearestTrap = object;
        }
      }
      if (!nearestTrap) {
        return;
      }
      let pos0 = myPlayer.pos.current,
        trapPos = nearestTrap.pos.current,
        enemyPos = nearestEnemy.pos.current,
        orbitSpin = Math.sin(ModuleHandler.tickCount * 0.18) * (Math.PI / 2.4),
        targetPos;

      // Avoid enemy spikes
      let enemySpikes = [];
      for (let [, object] of ObjectManager2.objects) {
        if (!(object instanceof PlayerObject) || object.type !== 15) continue;
        if (this.client.PlayerManager.isEnemyByID(object.ownerID, myPlayer)) {
          enemySpikes.push(object);
        }
      }

      // Check if targetPos would walk into spikes, adjust if needed
      let checkPos = trapPos.addDirection(
        enemyPos.angle(trapPos) + Math.PI + orbitSpin,
        nearestEnemy.scale + myPlayer.scale + 85
      );
      for (let spike of enemySpikes) {
        if (checkPos.distance(spike.pos.current) < myPlayer.scale + spike.placementScale + 20) {
          // Spike detected on path, adjust to go around
          let angleToSpike = pos0.angle(spike.pos.current);
          let safeOffset = angleToSpike + (Math.random() > 0.5 ? Math.PI / 2 : -Math.PI / 2);
          checkPos = checkPos.addDirection(safeOffset, 60);
        }
      }
      targetPos = checkPos;

      if (nearestEnemy.isTrapped && nearestEnemy.trappedIn === nearestTrap) {
        let trapEnemyAngle = trapPos.angle(enemyPos),
          orbitAngle = trapEnemyAngle + orbitSpin,
          orbitRadius = nearestTrap.placementScale + myPlayer.scale + 24;
        targetPos = trapPos.addDirection(orbitAngle, orbitRadius);
      } else {
        let baseAngle = enemyPos.angle(trapPos),
          orbitAngle = baseAngle + Math.PI + orbitSpin,
          orbitRadius = nearestEnemy.scale + myPlayer.scale + 85;
        targetPos = enemyPos.addDirection(orbitAngle, orbitRadius);
        if (!ModuleHandler.placedOnce && myPlayer.canPlace(7)) {
          let trapID = myPlayer.getItemByType(7),
            trapAngles = ObjectManager2.getBestPlacementAngles({
              position: pos0,
              id: trapID,
              targetAngle: pos0.angle(enemyPos),
              ignoreID: null,
              preplace: !1,
              reduce: !0,
              fill: !0,
            }).slice(0, 2);
          if (trapAngles.length) {
            let angle = trapAngles[0],
              newPos = pos0.addDirection(angle, myPlayer.getItemPlaceScale(trapID));
            if (newPos.distance(enemyPos) <= nearestEnemy.scale + Items[trapID].scale + 26) {
              ModuleHandler.place(7, angle);
              ModuleHandler.placeAngles[0] = 7;
              ModuleHandler.placeAngles[1].push(angle);
              ModuleHandler.placedOnce = !0;
            }
          }
        }
      }
      let moveAngle = SharedPathPlanner.getPathAngle(this.client, pos0, targetPos, myPlayer.scale);
      ModuleHandler.moveTo = moveAngle;
      ModuleHandler.currentAngle = pos0.angle(enemyPos);
    }
  }

  class ReverseInstakill {
    moduleName = "reverseInstakill";
    client;
    targetEnemy = null;
    constructor(client2) {
      this.client = client2;
    }
    reset() {
      this.targetEnemy = null;
    }
    postTick() {
      let {
        myPlayer: myPlayer,
        EnemyManager: EnemyManager2,
        PlayerManager: PlayerManager2,
        ModuleHandler: ModuleHandler,
        InputHandler: InputHandler2,
      } = this.client;
      if (!InputHandler2.instaToggle) {
        (this.reset(), InputHandler2.instaReset());
        return;
      }
      let nearestEnemy = EnemyManager2.nearestEnemy;
      if (nearestEnemy === null) {
        return;
      }
      let lookingShield = PlayerManager2.lookingShield(nearestEnemy, myPlayer),
        primary = myPlayer.getItemByType(0),
        primaryDamage = myPlayer.getMaxWeaponDamage(primary, lookingShield),
        secondary = myPlayer.getItemByType(1);
      if (secondary !== 10) {
        return;
      }
      let secondaryDamage = myPlayer.getMaxWeaponDamage(
        secondary,
        lookingShield,
      );
      if (primaryDamage + secondaryDamage + 25 < 100) {
        return;
      }
      let pos1 = myPlayer.pos.current,
        pos2 = nearestEnemy.pos.current,
        angle = pos1.angle(pos2);
      if (this.targetEnemy !== null) {
        ((ModuleHandler.moduleActive = !0),
          (ModuleHandler.useAngle = angle),
          (ModuleHandler.forceHat = 7),
          (ModuleHandler.forceWeapon = 0),
          (ModuleHandler.shouldAttack = !0),
          (this.targetEnemy = null),
          InputHandler2.instaReset(),
          EnemyManager2.attemptSpikePlacement());
        return;
      }
      InputHandler2.instakillTarget = nearestEnemy;
      let { reloading: reloading } = ModuleHandler.staticModules,
        primaryReloaded = reloading.isReloaded(0),
        secondaryReloaded = reloading.isReloaded(1),
        turretReloaded = reloading.isReloaded(2),
        range =
          DataHandler_default.getWeapon(primary).range + nearestEnemy.hitScale;
      if (
        !primaryReloaded ||
        !secondaryReloaded ||
        !turretReloaded ||
        !myPlayer.collidingSimple(nearestEnemy, range)
      ) {
        return;
      }
      ((ModuleHandler.moduleActive = !0),
        (ModuleHandler.useAngle = angle),
        (ModuleHandler.forceHat = 53),
        (ModuleHandler.forceWeapon = 1),
        (ModuleHandler.shouldAttack = !0),
        (this.targetEnemy = nearestEnemy));
    }
  }

  class BowInsta {
    moduleName = "bowInsta";
    client;
    targetEnemy = null;
    tickAction = 0;
    distMin = 660;
    distMax = 700;
    active = !1;
    constructor(client2) {
      this.client = client2;
    }
    reset() {
      ((this.targetEnemy = null), (this.tickAction = 0), (this.active = !1));
    }
    postTick() {
      let {
        EnemyManager: EnemyManager2,
        ModuleHandler: ModuleHandler,
        myPlayer: myPlayer,
        InputHandler: InputHandler2,
      } = this.client;
      if (!InputHandler2.instaToggle) {
        (this.reset(), InputHandler2.instaReset());
        return;
      }
      let nearestEnemy = EnemyManager2.nearestEnemy,
        nearest = this.targetEnemy || nearestEnemy;
      if (nearest === null) {
        this.reset();
        return;
      }
      let pos1 = myPlayer.pos.current,
        pos2 = nearest.pos.current,
        angle = pos1.angle(pos2),
        distance = pos1.distance(pos2);
      if (
        ((InputHandler2.instakillTarget = nearest), this.targetEnemy !== null)
      ) {
        if (this.tickAction === 2) {
          ((ModuleHandler.moduleActive = !0),
            (ModuleHandler.useAngle = angle),
            (ModuleHandler.forceWeapon = 1),
            (ModuleHandler.shouldAttack = !0),
            (ModuleHandler.moveTo = null),
            ModuleHandler.upgradeItem(15),
            this.reset(),
            InputHandler2.instaReset());
          return;
        }
        if (this.tickAction === 1) {
          ((ModuleHandler.moduleActive = !0),
            (ModuleHandler.useAngle = angle),
            (ModuleHandler.forceWeapon = 1),
            (ModuleHandler.shouldAttack = !0),
            (ModuleHandler.moveTo = null),
            ModuleHandler.upgradeItem(12),
            (this.tickAction = 2));
          return;
        }
        return;
      }
      if (!(inRange(myPlayer.upgradeAge, 6, 8) && myPlayer.age >= 9)) {
        return;
      }
      this.active = !0;
      let { reloading: reloading } = ModuleHandler.staticModules;
      if (
        !ModuleHandler.canBuy(0, 53) ||
        !reloading.isReloaded(2) ||
        !inRange(distance, this.distMin, this.distMax)
      ) {
        return;
      }
      if (
        ((ModuleHandler.moveTo = null),
          (ModuleHandler.moduleActive = !0),
          (ModuleHandler.useAngle = angle),
          (ModuleHandler.forceHat = 53),
          (ModuleHandler.forceWeapon = 1),
          (ModuleHandler.shouldAttack = !0),
          myPlayer.upgradeAge === 6)
      ) {
        ModuleHandler.upgradeItem(9);
      }
      if (myPlayer.upgradeAge === 7) {
        ModuleHandler.upgradeItem(18, !0);
      }
      if (myPlayer.upgradeAge === 8 && myPlayer.getItemByType(8) === 18) {
        (ModuleHandler.place(8, angle),
          ModuleHandler.place(8, angle - toRadians(90)),
          ModuleHandler.place(8, angle + toRadians(90)),
          ModuleHandler.place(8, reverseAngle(angle)));
      }
      ((this.tickAction = 1), (this.targetEnemy = nearestEnemy));
    }
  }

  class PlacementDefense {
    moduleName = "placementDefense";
    client;
    _wasTrappedLastTick = !1;
    _antiRetrapBurstTick = 0;
    _antiRetrapBurstType = null;
    _antiRetrapBurstAngles = [];
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
        ModuleHandler: ModuleHandler,
        ProjectileManager: ProjectileManager2,
        ObjectManager: ObjectManager2,
      } = this.client,
        nearestEnemy = EnemyManager2.nearestEnemy;
      if (nearestEnemy === null || !Settings_default._placementDefense) {
        this._wasTrappedLastTick = myPlayer.isTrapped;
        return;
      }
      if (
        this._antiRetrapBurstAngles.length &&
        ModuleHandler.tickCount - this._antiRetrapBurstTick <= 2 &&
        this._antiRetrapBurstType !== null &&
        myPlayer.canPlace(this._antiRetrapBurstType)
      ) {
        ModuleHandler.placedOnce = !0;
        ModuleHandler.placeAngles[0] = this._antiRetrapBurstType;
        for (let a of this._antiRetrapBurstAngles) {
          ModuleHandler.place(this._antiRetrapBurstType, a);
          ModuleHandler.placeAngles[1].push(a);
        }
        return;
      }
      let justEscapedTrap = this._wasTrappedLastTick && !myPlayer.isTrapped,
        isTrappedNearEnemy = myPlayer.isTrapped && myPlayer.collidingSimple(nearestEnemy, 350);
      this._wasTrappedLastTick = myPlayer.isTrapped;
      if ((justEscapedTrap || isTrappedNearEnemy) && !ModuleHandler.placedOnce) {
        let pos1 = myPlayer.pos.current,
          pos2 = nearestEnemy.pos.current,
          enemyAngle = pos1.angle(pos2),
          reverseAngle2 = pos2.angle(pos1),
          enemyDir = nearestEnemy.dir ?? enemyAngle,
          targetAngle = justEscapedTrap ? enemyAngle : reverseAngle2,
          trapID = myPlayer.getItemByType(7);
        if (isTrappedNearEnemy && myPlayer.trappedIn !== null && myPlayer.canPlace(4)) {
          let spikeID = myPlayer.getItemByType(4),
            trapPos = myPlayer.trappedIn.pos.current,
            trapEnemyAngle = trapPos.angle(pos2),
            spikeLength = myPlayer.getItemPlaceScale(spikeID),
            spikeScale = Items[spikeID].scale,
            spikeAngles = ObjectManager2.getBestPlacementAngles({
              position: pos1,
              id: spikeID,
              targetAngle: trapEnemyAngle,
              ignoreID: myPlayer.trappedIn.id,
              preplace: !1,
              reduce: !0,
              fill: !0,
            })
              .map((a) => ({
                angle: a,
                score:
                  (trapPos.distance(pos1.addDirection(a, spikeLength)) <= myPlayer.trappedIn.placementScale + spikeScale + 22 ? 8 : 0) +
                  (pos2.distance(pos1.addDirection(a, spikeLength)) <= nearestEnemy.collisionScale + spikeScale + 8 ? 7 : 0) +
                  (Math.PI - getAngleDist(trapPos.angle(pos1.addDirection(a, spikeLength)), enemyDir)) * 2,
              }))
              .sort((a, b) => b.score - a.score)
              .slice(0, 4)
              .map((a) => a.angle);
          if (spikeAngles.length) {
            ModuleHandler.placedOnce = !0;
            ModuleHandler.placeAngles[0] = 4;
            for (let a of spikeAngles) {
              ModuleHandler.place(4, a);
              ModuleHandler.placeAngles[1].push(a);
            }
            this._antiRetrapBurstTick = ModuleHandler.tickCount;
            this._antiRetrapBurstType = 4;
            this._antiRetrapBurstAngles = spikeAngles.slice();
            return;
          }
        }
        if (trapID === 16 && myPlayer.canPlace(7)) {
          let allTrapAngles = ObjectManager2.getBestPlacementAngles({
            position: pos1,
            id: trapID,
            targetAngle: targetAngle,
            ignoreID: myPlayer.trappedIn?.id ?? null,
            preplace: !1,
            reduce: !0,
            fill: !0,
          }),
            placeLength = myPlayer.getItemPlaceScale(trapID),
            trapScale = Items[trapID].scale,
            scored = allTrapAngles.map((a) => {
              let trapPos = pos1.addDirection(a, placeLength),
                score = 0,
                distToMe = trapPos.distance(pos1);
              if (justEscapedTrap) {
                let distToEnemy = trapPos.distance(pos2);
                if (distToEnemy <= trapScale + nearestEnemy.collisionScale + 15) score += 6;
                let blockAngle = pos2.angle(trapPos),
                  blockScore = Math.PI - getAngleDist(blockAngle, enemyDir);
                score += blockScore * 2;
              } else {
                if (distToMe <= trapScale + myPlayer.scale + 20) score += 5;
                let blockAngle = pos1.angle(trapPos),
                  blockScore = Math.PI - getAngleDist(blockAngle, reverseAngle2);
                score += blockScore * 1.5;
              }
              return { angle: a, score: score };
            }).sort((a, b) => b.score - a.score).slice(0, 3);
          if (scored.length > 0) {
            let bestAngles = scored.map((s) => s.angle);
            for (let a of bestAngles) {
              ModuleHandler.place(7, a);
            }
            ModuleHandler.placedOnce = !0;
            ModuleHandler.placeAngles[0] = 7;
            ModuleHandler.placeAngles[1] = bestAngles;
            this._antiRetrapBurstTick = ModuleHandler.tickCount;
            this._antiRetrapBurstType = 7;
            this._antiRetrapBurstAngles = bestAngles.slice();
            return;
          }
        }
        if (justEscapedTrap) {
          let spikeType = myPlayer.getItemByType(4);
          if (myPlayer.canPlace(4)) {
            let spikeAngles = ObjectManager2.getBestPlacementAngles({
              position: pos1,
              id: spikeType,
              targetAngle: enemyAngle,
              ignoreID: null,
              preplace: !1,
              reduce: !0,
              fill: !0,
            }).slice(0, 2);
            if (spikeAngles.length > 0) {
              for (let a of spikeAngles) {
                ModuleHandler.place(4, a);
              }
              ModuleHandler.placedOnce = !0;
              ModuleHandler.placeAngles[0] = 4;
              ModuleHandler.placeAngles[1] = spikeAngles;
              this._antiRetrapBurstTick = ModuleHandler.tickCount;
              this._antiRetrapBurstType = 4;
              this._antiRetrapBurstAngles = spikeAngles.slice();
              return;
            }
          }
        }
      }
      if (
        EnemyManager2.rangedBowInsta ||
        ProjectileManager2.totalDamage >= myPlayer.currentHealth
      ) {
        let pos1 = myPlayer.pos.current,
          pos2 = nearestEnemy.pos.current,
          angle = pos1.angle(pos2),
          type = 3;
        if (myPlayer.canPlace(5)) {
          type = 5;
        }
        (ModuleHandler.place(type, angle),
          (ModuleHandler.placedOnce = !0),
          (ModuleHandler.placeAngles[0] = type),
          (ModuleHandler.placeAngles[1] = [angle]));
      }
    }
  }

  class TurretSteal {
    moduleName = "turretSteal";
    client;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        myPlayer: myPlayer,
        EnemyManager: EnemyManager2,
      } = this.client;
      if (ModuleHandler.moduleActive || !Settings_default._turretSteal) {
        return;
      }
      let nearestEnemy = EnemyManager2.nearestTurretEntity;
      if (
        nearestEnemy === null ||
        nearestEnemy.currentHealth > 25 ||
        !ModuleHandler.canBuy(0, 53)
      ) {
        return;
      }
      let pos0 = myPlayer.pos.current,
        pos1 = nearestEnemy.pos.current;
      if (pos0.distance(pos1) > 700) {
        return;
      }
      let { reloading: reloading } = ModuleHandler.staticModules;
      if (!reloading.isReloaded(2, 0)) {
        return;
      }
      ((ModuleHandler.moduleActive = !0), (ModuleHandler.forceHat = 53));
    }
  }

  class KillChat {
    moduleName = "killChat";
    client;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let { myPlayer: myPlayer, PacketManager: PacketManager2 } = this.client;
      if (
        !Settings_default._killMessage ||
        !myPlayer.killedSomeone ||
        myPlayer.resources.kills === 0
      ) {
        return;
      }
      let message = (Settings_default._killMessageText || "").trim();
      if (message.length === 0) {
        return;
      }
      PacketManager2.chat(message);
    }
  }

  class SwordKatanaInsta {
    moduleName = "swordKatanaInsta";
    client;
    nearestTarget = null;
    useTurret = !1;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        myPlayer: myPlayer,
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
      } = this.client,
        nearestEnemy = EnemyManager2.nearestEnemy;
      if (ModuleHandler.moduleActive || !nearestEnemy) {
        ((this.nearestTarget = null), (this.useTurret = !1));
        return;
      }
      let { reloading: reloading } = ModuleHandler.staticModules,
        primaryReloaded = reloading.isReloaded(0),
        turretReloaded = reloading.isReloaded(2);
      if (this.useTurret) {
        if (
          ((this.useTurret = !1), turretReloaded && ModuleHandler.canBuy(0, 53))
        ) {
          ((ModuleHandler.moduleActive = !0), (ModuleHandler.forceHat = 53));
        }
        return;
      }
      let primary = myPlayer.getItemByType(0),
        isSword = primary === 3,
        pos1 = myPlayer.pos.current,
        target = this.nearestTarget;
      if (target !== null) {
        let pos22 = target.pos.current,
          angle2 = pos1.angle(pos22);
        if (
          ((ModuleHandler.useAngle = angle2),
            (ModuleHandler.forceHat = 7),
            (ModuleHandler.forceWeapon = 0),
            (ModuleHandler.shouldAttack = !0),
            myPlayer.upgradeAge === 3)
        ) {
          ModuleHandler.upgradeItem(1, !0);
        }
        if (myPlayer.upgradeAge === 4) {
          ModuleHandler.upgradeItem(15, !0);
        }
        if (myPlayer.upgradeAge === 5) {
          ModuleHandler.upgradeItem(7, !0);
        }
        if (myPlayer.upgradeAge === 6) {
          ModuleHandler.upgradeItem(10);
        }
        if (myPlayer.upgradeAge === 7) {
          ModuleHandler.upgradeItem(22, !0);
        }
        if (myPlayer.upgradeAge === 8) {
          ModuleHandler.upgradeItem(4);
        }
        if (((this.nearestTarget = null), ModuleHandler.canBuy(0, 53))) {
          this.useTurret = !0;
        }
        EnemyManager2.attemptSpikePlacement();
      }
      if (
        myPlayer.age < 8 ||
        !isSword ||
        !primaryReloaded ||
        !ModuleHandler.canBuy(0, 7)
      ) {
        return;
      }
      let range =
        DataHandler_default.getWeapon(primary).range + nearestEnemy.hitScale;
      if (!myPlayer.collidingSimple(nearestEnemy, range)) {
        return;
      }
      let pos2 = nearestEnemy.pos.current,
        angle = pos1.angle(pos2);
      ((ModuleHandler.useAngle = angle),
        (ModuleHandler.forceHat = 7),
        (ModuleHandler.forceWeapon = 0),
        (ModuleHandler.shouldAttack = !0),
        (this.nearestTarget = nearestEnemy));
    }
  }

  class SpikeGearInsta {
    moduleName = "spikeGearInsta";
    client;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client;
      if (
        ModuleHandler.moduleActive ||
        EnemyManager2.instaThreat() ||
        EnemyManager2.spikeSyncThreat ||
        !Settings_default._spikeGearInsta
      ) {
        return;
      }
      let nearestEnemy = EnemyManager2.nearestEnemy;
      if (
        nearestEnemy === null ||
        !ModuleHandler.canBuy(0, 11) ||
        !ModuleHandler.canBuy(1, 21) ||
        myPlayer.accessoryID !== 21 ||
        nearestEnemy.variant.primary !== 0
      ) {
        return;
      }
      let pos1 = myPlayer.pos.current,
        pos2 = nearestEnemy.pos.current,
        angle = pos1.angle(pos2),
        primary1 = myPlayer.getItemByType(0),
        primary2 = nearestEnemy.weapon.primary;
      if (primary2 === null) {
        return;
      }
      let range1 =
        DataHandler_default.getWeapon(primary1).range + nearestEnemy.hitScale,
        range2 =
          DataHandler_default.getWeapon(primary2).range + myPlayer.hitScale;
      if (
        !myPlayer.collidingSimple(nearestEnemy, range1) ||
        !nearestEnemy.collidingSimple(myPlayer, range2)
      ) {
        return;
      }
      if (
        ((ModuleHandler.forceHat = 11),
          nearestEnemy.hatID !== 7 ||
          !nearestEnemy.isEmptyReload(0) ||
          myPlayer.hatID !== 11)
      ) {
        return;
      }
      ((ModuleHandler.moduleActive = !0),
        (ModuleHandler.useAngle = angle),
        (ModuleHandler.forceHat = 7),
        (ModuleHandler.forceWeapon = 0),
        (ModuleHandler.shouldAttack = !0));
    }
  }

  class TeammateSpikeTrap {
    moduleName = "teammateSpikeTrap";
    client;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        InputHandler: InputHandler2,
        PlayerManager: PlayerManager2,
        myPlayer: myPlayer,
        PacketManager: PacketManager2,
      } = this.client;
      if (ModuleHandler.moduleActive) {
        return;
      }
      if (!InputHandler2.instaToggle) {
        InputHandler2.instaReset();
        return;
      }
      let nearestTeammate = PlayerManager2.nearestTeammate;
      if (!nearestTeammate) {
        return;
      }
      let pos1 = myPlayer.pos.current,
        pos2 = nearestTeammate.pos.current,
        distance = pos1.distance(pos2),
        angle = pos1.angle(pos2);
      if (distance > 500) {
        return;
      }
      if (((InputHandler2.instakillTarget = nearestTeammate), distance > 175)) {
        return;
      }
      let angles = [
        angle,
        angle - toRadians(90),
        angle + toRadians(90),
        angle + toRadians(180),
      ],
        id = myPlayer.getItemByType(4),
        distance2 = myPlayer.getPlacePosition(pos1, id, angle).distance(pos1);
      if (
        ((ModuleHandler.placeAngles[0] = 4),
          (ModuleHandler.placeAngles[1] = angles),
          distance > distance2 ||
          !angles.every((angle2) => myPlayer.canPlaceObject(4, angle2)))
      ) {
        return;
      }
      (InputHandler2.instaReset(), PacketManager2.leaveClan());
      for (let angle2 of angles) {
        ModuleHandler.place(4, angle2);
      }
    }
  }

  class SpikeTrap {
    moduleName = "spikeTrap";
    client;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        myPlayer: myPlayer,
        EnemyManager: EnemyManager2,
      } = this.client;
      if (ModuleHandler.moduleActive) {
        return;
      }
      let trapId = myPlayer.getItemByType(7),
        nearestEnemy = EnemyManager2.nearestEnemy;
      if (!nearestEnemy || myPlayer.isTrapped || trapId !== 16) {
        return;
      }
      let pos1 = myPlayer.pos.current,
        pos2 = nearestEnemy.pos.current,
        distance = pos1.distance(pos2),
        angle = pos1.angle(pos2);
      if (distance > 175) {
        return;
      }
      let angles = [
        angle,
        angle - toRadians(90),
        angle + toRadians(90),
        angle + toRadians(180),
      ],
        id = myPlayer.getItemByType(4),
        len = ModuleHandler.currentType === 7 ? 30 : 0,
        distance2 =
          myPlayer.getPlacePosition(pos1, id, angle).distance(pos1) + len;
      if (
        ((ModuleHandler.placeAngles[0] = 4),
          (ModuleHandler.placeAngles[1] = angles),
          distance > distance2)
      ) {
        return;
      }
      for (let angle2 of angles) {
        ModuleHandler.place(4, angle2);
      }
    }
  }

  class TurretSync {
    moduleName = "turretSync";
    client;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client;
      if (ModuleHandler.moduleActive || !Settings_default._turretSync) {
        return;
      }
      let nearestEnemy = EnemyManager2.nearestEnemy;
      if (nearestEnemy === null) {
        return;
      }
      let primary = myPlayer.getItemByType(0),
        weapon = DataHandler_default.getWeapon(primary);
      if (weapon.damage < 20) {
        return;
      }
      let range = weapon.range + nearestEnemy.hitScale,
        { reloading: reloading } = ModuleHandler.staticModules;
      if (
        !myPlayer.collidingSimple(nearestEnemy, range) ||
        !reloading.isReloaded(0) ||
        nearestEnemy.nextDamageTick !== myPlayer.tickCount + 2
      ) {
        return;
      }
      let pos1 = myPlayer.pos.current,
        pos2 = nearestEnemy.pos.current,
        angle = pos1.angle(pos2);
      ((ModuleHandler.moduleActive = !0),
        (ModuleHandler.useAngle = angle),
        (ModuleHandler.forceHat = 7),
        (ModuleHandler.forceWeapon = 0),
        (ModuleHandler.shouldAttack = !0));
    }
  }

  class DashMovement {
    moduleName = "dashMovement";
    client;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let { ModuleHandler: ModuleHandler, myPlayer: myPlayer } = this.client,
        { currentType: currentType, currentAngle: currentAngle } =
          ModuleHandler;
      if (!myPlayer.canPlace(currentType) || !Settings_default._dashMovement) {
        return;
      }
      let { reloading: reloading } = ModuleHandler.staticModules,
        primary = myPlayer.getItemByType(0),
        secondary = myPlayer.getItemByType(1);
      if (
        myPlayer.getItemByType(7) !== 16 ||
        !ModuleHandler.hasStoreItem(0, 40) ||
        currentType !== 7 ||
        ModuleHandler.placedOnce
      ) {
        return;
      }
      let hasHammer = secondary === 10,
        canOneHit =
          myPlayer.getBuildingDamage(primary, !0) >=
          DataHandler_default.getItem(16).health,
        weaponType = null;
      if (canOneHit) {
        let primaryData = DataHandler_default.getWeapon(primary),
          secondaryData =
            (DataHandler_default.isMelee(secondary) &&
              DataHandler_default.getWeapon(secondary)) ||
            null;
        if (secondaryData === null || primaryData.speed < secondaryData.speed) {
          weaponType = 0;
        }
      }
      if (weaponType === null && hasHammer) {
        weaponType = 1;
      }
      if (weaponType === null) {
        return;
      }
      if (
        ((ModuleHandler.placedOnce = !0), !reloading.isReloaded(weaponType))
      ) {
        return;
      }
      (ModuleHandler.place(currentType, currentAngle),
        (ModuleHandler.useAngle = currentAngle),
        (ModuleHandler.useHat = 40),
        (ModuleHandler.forceWeapon = weaponType),
        (ModuleHandler.shouldAttack = !0));
    }
  }

  class KBTickHammerV2 {
    moduleName = "kbTickHammerV2";
    client;
    targetEnemy = null;
    constructor(client2) {
      this.client = client2;
    }
    postTick() {
      let {
        ModuleHandler: ModuleHandler,
        EnemyManager: EnemyManager2,
        myPlayer: myPlayer,
      } = this.client;
      if (
        ModuleHandler.moduleActive ||
        !Settings_default._knockbackTickHammer ||
        EnemyManager2.shouldIgnoreModule()
      ) {
        this.targetEnemy = null;
        return;
      }
      let {
        nearestEnemySpikeCollider: nearestEnemySpikeCollider,
        spikeCollider: spikeCollider,
      } = EnemyManager2,
        reloading = ModuleHandler.staticModules.reloading,
        primary = myPlayer.getItemByType(0),
        secondary = myPlayer.getItemByType(1),
        isHammer = secondary !== null && secondary !== 11,
        primaryReloaded = reloading.isReloaded(0),
        secondaryReloaded = reloading.isReloaded(1),
        pos1 = myPlayer.pos.current;
      if (this.targetEnemy !== null) {
        let pos2 = this.targetEnemy.pos.current,
          angleToEnemy = pos1.angle(pos2);
        ((ModuleHandler.moduleActive = !0),
          (ModuleHandler.useAngle = angleToEnemy),
          (ModuleHandler.forceHat = 7),
          (ModuleHandler.forceWeapon = 0),
          (ModuleHandler.shouldAttack = !0),
          (this.targetEnemy = null),
          EnemyManager2.attemptSpikePlacement());
        return;
      }
      if (
        nearestEnemySpikeCollider !== null &&
        !nearestEnemySpikeCollider.isTrapped &&
        spikeCollider !== null &&
        isHammer &&
        primaryReloaded &&
        secondaryReloaded
      ) {
        let pos2 = nearestEnemySpikeCollider.pos.current,
          pos3 = spikeCollider.pos.current,
          angleToEnemy = pos1.angle(pos2),
          distanceToSpike2 = pos2.distance(pos3),
          { knockback: primaryKnockback, range: primaryRange } =
            DataHandler_default.getWeapon(primary),
          { knockback: secondaryKnockback, range: secondaryRange } =
            DataHandler_default.getWeapon(secondary),
          weaponRange =
            Math.min(primaryRange, secondaryRange) +
            nearestEnemySpikeCollider.hitScale,
          minKB = primaryKnockback,
          maxKB = primaryKnockback + secondaryKnockback,
          spikeRange =
            spikeCollider.collisionScale +
            nearestEnemySpikeCollider.collisionScale;
        if (
          inRange(distanceToSpike2, spikeRange + minKB, spikeRange + maxKB) &&
          myPlayer.collidingSimple(nearestEnemySpikeCollider, weaponRange)
        ) {
          let hitRange =
            DataHandler_default.getWeapon(secondary).range +
            nearestEnemySpikeCollider.hitScale;
          if (myPlayer.collidingSimple(nearestEnemySpikeCollider, hitRange)) {
            ((ModuleHandler.moduleActive = !0),
              (ModuleHandler.useAngle = angleToEnemy),
              (ModuleHandler.forceHat = 7),
              (ModuleHandler.forceWeapon = 1),
              (ModuleHandler.shouldAttack = !0),
              (this.targetEnemy = nearestEnemySpikeCollider),
              (this.client.StatsManager.knockbackTickHammerTimes = 1));
          }
        }
      }
    }
  }

  class ModuleHandler {
    client;
    staticModules = {};
    botModules;
    modules;
    store = [
      {
        utility: new Map(),
        lastUtility: null,
        current: 0,
        best: 0,
        actual: -1,
        last: 0,
      },
      {
        utility: new Map(),
        lastUtility: null,
        current: 0,
        best: 0,
        actual: -1,
        last: 0,
      },
    ];
    bought = [new Set(), new Set()];
    followTarget = new Vector_default(0, 0);
    lookTarget = new Vector_default(0, 0);
    endTarget = new Vector_default(0, 0);
    followPath = !1;
    tickCount = 0;
    currentHolding = 0;
    weapon;
    currentType;
    attacking;
    attackingState;
    sentAngle;
    sentHatEquip;
    sentAccEquip;
    needToHeal;
    didAntiInsta;
    placedOnce;
    healedOnce;
    totalPlaces;
    attacked;
    canHitEntity = !1;
    moduleActive = !1;
    useAngle = null;
    useWeapon = null;
    useItem = null;
    forceWeapon = null;
    useHat = null;
    forceHat = null;
    shouldEquipSoldier = !1;
    useAcc = null;
    previousWeapon = null;
    currentAngle = 0;
    move_dir = null;
    reverse_move_dir = null;
    moveTo = "disable";
    prevMoveTo = "disable";
    autoattack = !1;
    shouldAttack = !1;
    mouse = {
      sentAngle: 0,
    };
    placeAngles = [null, []];
    constructor(client2) {
      ((this.client = client2),
        (this.staticModules = {
          tempData: new TempData_default(client2),
          movement: new Movement_default(client2),
          clanJoiner: new ClanJoiner_default(client2),
          autoAccept: new AutoAccept_default(client2),
          autoBuy: new AutoBuy(client2),
          defaultHat: new DefaultHat(client2),
          reloading: new Reloading_default(client2),
          defaultAcc: new DefaultAcc(client2),
          autoSync: new AutoSync(client2),
          spikeSyncHammer: new SpikeSyncHammer(client2),
          spikeSync: new SpikeSync(client2),
          spikeTick: new SpikeTick_default(client2),
          knockbackTickTrap: new KnockbackTickTrap(client2),
          knockbackTick: new KnockbackTick(client2),
          knockbackTickHammer: new KnockbackTickHammer(client2),
          kbTickHammerV2: new KBTickHammerV2(client2),
          antiRetrap: new AntiRetrap(client2),
          autoPlay: new AutoPlay(client2),
          autoPush: new AutoPush(client2),
          velocityTick: new VelocityTick(client2),
          spikeTrap: new SpikeTrap(client2),
          teammateSpikeTrap: new TeammateSpikeTrap(client2),
          turretSync: new TurretSync(client2),
          toolHammerSpearInsta: new ToolHammerSpearInsta(client2),
          swordKatanaInsta: new SwordKatanaInsta(client2),
          bowInsta: new BowInsta(client2),
          instakill: new Instakill(client2),
          reverseInstakill: new ReverseInstakill(client2),
          autoBreak: new Autobreak(client2),
          autoSteal: new AutoSteal(client2),
          turretSteal: new TurretSteal(client2),
          spikeGearInsta: new SpikeGearInsta(client2),
          useFastest: new UseFastest(client2),
          useDestroying: new UseDestroying(client2),
          useAttacking: new UseAttacking(client2),
          utilityHat: new UtilityHat(client2),
          antiInsta: new AntiInsta_default(client2),
          shameReset: new ShameReset_default(client2),
          safeWalk: new SafeWalk(client2),
          dashMovement: new DashMovement(client2),
          autoPlacer: new AutoPlacer_default(client2),
          placer: new Placer_default(client2),
          autoMill: new Automill_default(client2),
          autoGrind: new AutoGrind(client2),
          preAttack: new PreAttack_default(client2),
          autoHat: new Autohat_default(client2),
          updateAttack: new UpdateAttack_default(client2),
          updateAngle: new UpdateAngle_default(client2),
          killChat: new KillChat(client2),
        }),
        (this.botModules = [
          this.staticModules.tempData,
          this.staticModules.clanJoiner,
          this.staticModules.movement,
        ]),
        (this.modules = [
          this.staticModules.autoAccept,
          this.staticModules.autoBuy,
          this.staticModules.defaultHat,
          this.staticModules.reloading,
          this.staticModules.defaultAcc,
          this.staticModules.autoSync,
          this.staticModules.spikeSyncHammer,
          this.staticModules.spikeSync,
          this.staticModules.spikeTick,
          this.staticModules.knockbackTickTrap,
          this.staticModules.knockbackTickHammer,
          this.staticModules.kbTickHammerV2,
          this.staticModules.knockbackTick,
          this.staticModules.antiRetrap,
          this.staticModules.autoPlay,
          this.staticModules.autoPush,
          this.staticModules.velocityTick,
          this.staticModules.spikeTrap,
          this.staticModules.teammateSpikeTrap,
          this.staticModules.turretSync,
          this.staticModules.toolHammerSpearInsta,
          this.staticModules.swordKatanaInsta,
          this.staticModules.bowInsta,
          this.staticModules.instakill,
          this.staticModules.reverseInstakill,
          this.staticModules.autoBreak,
          this.staticModules.autoSteal,
          this.staticModules.turretSteal,
          this.staticModules.spikeGearInsta,
          this.staticModules.useFastest,
          this.staticModules.useDestroying,
          this.staticModules.useAttacking,
          this.staticModules.utilityHat,
          this.staticModules.antiInsta,
          this.staticModules.shameReset,
          this.staticModules.safeWalk,
          this.staticModules.autoPlacer,
          this.staticModules.dashMovement,
          this.staticModules.placer,
          this.staticModules.autoMill,
          this.staticModules.autoGrind,
          this.staticModules.preAttack,
          this.staticModules.autoHat,
          this.staticModules.updateAttack,
          this.staticModules.updateAngle,
          this.staticModules.killChat,
        ]),
        this.reset());
    }
    movementReset() {
      ((this.currentHolding = 0),
        (this.weapon = 0),
        (this.currentType = null),
        (this.attacking = 0),
        (this.attackingState = 0),
        (this.move_dir = null),
        (this.reverse_move_dir = null));
    }
    reset() {
      let { isOwner: isOwner, clients: clients } = this.client;
      (this.movementReset(),
        this.getHatStore().utility.clear(),
        this.getAccStore().utility.clear(),
        (this.sentAngle = 0),
        (this.sentHatEquip = !1),
        (this.sentAccEquip = !1),
        (this.needToHeal = !1),
        (this.didAntiInsta = !1),
        (this.placedOnce = !1),
        (this.healedOnce = !1),
        (this.totalPlaces = 0),
        (this.attacked = !1),
        (this.canHitEntity = !1),
        (this.autoattack = !1));
      for (let module of this.modules) {
        if ("reset" in module) {
          module.reset();
        }
      }
      if (isOwner) {
        for (let client2 of clients) {
          (client2.ModuleHandler.movementReset(),
            client2.ModuleHandler.toggleAutoattack(!1));
        }
      }
    }
    get holdingWeapon() {
      return this.currentHolding <= 1;
    }
    get isMoving() {
      return this.move_dir !== null;
    }
    setForceHat(hat) {
      if (this.forceHat !== null && hat !== null) {
        return;
      }
      this.forceHat = hat;
    }
    getHatStore() {
      return this.store[0];
    }
    getAccStore() {
      return this.store[1];
    }
    setFollowTarget(x, y) {
      this.followTarget.setXY(x, y);
    }
    setLookTarget(x, y) {
      this.lookTarget.setXY(x, y);
    }
    updateSentAngle(priority) {
      if (this.sentAngle >= priority) {
        return;
      }
      this.sentAngle = priority;
    }
    upgradeItem(id, isItem = !1) {
      if (isItem) {
        id += 16;
      }
      if (
        (this.client.PacketManager.upgradeItem(id),
          this.client.myPlayer.upgradeItem(id),
          DataHandler_default.isWeapon(id))
      ) {
        let type = DataHandler_default.getWeapon(id).type,
          { reloading: reloading } = this.staticModules;
        reloading.updateMaxReload(type);
      }
    }
    startMovement(angle = this.move_dir, ignore = !1) {
      if (!ignore) {
        if (
          ((this.move_dir = angle),
            (this.reverse_move_dir = angle === null ? null : reverseAngle(angle)),
            this.moveTo !== "disable")
        ) {
          return;
        }
      }
      let { EnemyManager: EnemyManager2 } = this.client,
        { safeWalk: safeWalk } = this.staticModules;
      if (
        safeWalk.willGetHit(angle, 45, EnemyManager2.nearestCollider) ||
        safeWalk.willGetHit(angle, 45, EnemyManager2.secondNearestCollider)
      ) {
        return !1;
      }
      return (this.client.PacketManager.move(angle), !0);
    }
    stopMovement() {
      this.client.PacketManager.resetMoveDir();
    }
    startPlacement(type) {
      this.currentType = type;
    }
    canBuy(type, id) {
      if (id === -1) {
        return !1;
      }
      let price = DataHandler_default.getStore(type)[id].price;
      return (
        this.bought[type].has(id) ||
        (this.client.myPlayer.tempGold >= price &&
          this.client.myPlayer.isSandbox)
      );
    }
    buy(type, id, force = !1) {
      let store2 = DataHandler_default.getStore(type),
        {
          isOwner: isOwner,
          clients: clients,
          myPlayer: myPlayer,
          PacketManager: PacketManager2,
        } = this.client;
      if (!myPlayer.inGame) {
        return !1;
      }
      if (force) {
        if (isOwner) {
          for (let client2 of clients) {
            client2.ModuleHandler.buy(type, id, force);
          }
        }
      }
      let price = store2[id].price,
        bought = this.bought[type];
      if (price === 0) {
        return (bought.add(id), !0);
      }
      if (
        !bought.has(id) &&
        myPlayer.tempGold >= price &&
        (myPlayer.isSandbox || force)
      ) {
        return (PacketManager2.buy(type, id), (myPlayer.tempGold -= price), !1);
      }
      return bought.has(id);
    }
    hasStoreItem(type, id) {
      return this.bought[type].has(id);
    }
    equip(type, id, force = !1, toggle = !1) {
      let store2 = this.store[type],
        {
          myPlayer: myPlayer,
          PacketManager: PacketManager2,
          EnemyManager: EnemyManager2,
          isOwner: isOwner,
          clients: clients,
        } = this.client;
      if (toggle && store2.last === id && id !== 0) {
        id = 0;
      }
      if (!myPlayer.inGame || !this.buy(type, id, force)) {
        return !1;
      }
      if (store2.last === id && myPlayer.storeData[type] === id) {
        return !1;
      }
      if (((store2.last = id), PacketManager2.equip(type, id), type === 0)) {
        this.sentHatEquip = !0;
      } else {
        this.sentAccEquip = !0;
      }
      if (force) {
        if (((store2.actual = id), isOwner)) {
          for (let client2 of clients) {
            client2.ModuleHandler.staticModules.tempData.setStore(type, id);
          }
        }
      }
      let nearest = EnemyManager2.nearestTurretEntity,
        reloading = this.staticModules.reloading;
      if (
        nearest !== null &&
        reloading.isReloaded(2) &&
        type === 0 &&
        id === 53
      ) {
        reloading.resetByType(2);
      }
      return !0;
    }
    updateAngle(angle, force = !1) {
      if (!force && angle === this.mouse.sentAngle) {
        return;
      }
      ((this.mouse.sentAngle = angle),
        this.updateSentAngle(3),
        this.client.PacketManager.updateAngle(angle));
    }
    selectItem(type) {
      let { myPlayer: myPlayer } = this.client,
        item = myPlayer.getItemByType(type);
      if (myPlayer.currentItem !== -1) {
        ((myPlayer.currentItem = -1), this.whichWeapon());
      }
      (this.client.PacketManager.selectItemByID(item, !1),
        (this.currentHolding = type));
    }
    attack(angle, priority = 2) {
      if (angle !== null) {
        this.mouse.sentAngle = angle;
      }
      if (
        (this.updateSentAngle(priority),
          this.client.PacketManager.attack(angle),
          this.holdingWeapon)
      ) {
        this.attacked = !0;
      }
    }
    stopAttack() {
      this.client.PacketManager.stopAttack();
    }
    toggleAutoattack(state = !this.autoattack) {
      ((this.autoattack = state), (this.attacking = state ? 1 : 0));
    }
    whichWeapon(type = this.weapon) {
      let weapon = this.client.myPlayer.getItemByType(type);
      if (weapon === null) {
        return;
      }
      ((this.currentHolding = type),
        (this.weapon = type),
        this.client.PacketManager.selectItemByID(weapon, !0));
    }
    place(type, angle = this.currentAngle) {
      ((this.totalPlaces += 1),
        this.selectItem(type),
        this.attack(angle, 1),
        this.whichWeapon());
    }
    heal() {
      (this.selectItem(2), this.attack(null, 1), this.whichWeapon());
    }
    circleOffset = 0;
    targetSpeed = 65;
    activeModule = null;
    postTick() {
      if (Settings_default._circleRotation && this.move_dir === null) {
        let rotationSpeed = this.targetSpeed / Settings_default._circleRadius;
        this.circleOffset = (this.circleOffset + rotationSpeed) % (Math.PI * 2);
      }
      let { isOwner: isOwner } = this.client;
      if (
        ((this.placeAngles[0] = null),
          (this.placeAngles[1].length = 0),
          (this.activeModule = null),
          (this.tickCount += 1),
          (this.sentAngle = 0),
          (this.sentHatEquip = !1),
          (this.sentAccEquip = !1),
          (this.didAntiInsta = !1),
          (this.placedOnce = !1),
          (this.healedOnce = !1),
          (this.totalPlaces = 0),
          (this.attacked = !1),
          (this.canHitEntity = !1),
          (this.moduleActive = !1),
          (this.useWeapon = null),
          (this.useItem = null),
          (this.forceWeapon = null),
          (this.useHat = null),
          (this.forceHat = null),
          (this.shouldEquipSoldier = !1),
          (this.useAcc = null),
          (this.useAngle = null),
          (this.shouldAttack = !1),
          (this.prevMoveTo = this.moveTo),
          (this.moveTo = "disable"),
          !isOwner)
      ) {
        for (let botModule of this.botModules) {
          botModule.postTick();
        }
      }
      for (let module of this.modules) {
        let prevg = this.moduleActive;
        if ((module.postTick(), !prevg && this.moduleActive)) {
          this.activeModule = module.moduleName;
        }
      }
      if (((this.attackingState = this.attacking), isOwner)) {
        (this.client.InputHandler.postTick(),
          GameUI_default.updateFastQ(this.didAntiInsta),
          GameUI_default.updatePlaces(this.totalPlaces),
          GameUI_default.updateActiveModule(
            this.activeModule + ", " + this.tickCount,
          ),
          GameUI_default.updateEquipHat(
            `${this.store[0].last},  ${this.shouldEquipSoldier}`,
          ));
      }
    }
  }

  const ModuleHandler_default = ModuleHandler;

  class PlayerClient {
    id = -1;
    connectSuccess = !1;
    clientID = null;
    owner;
    SocketManager;
    ObjectManager;
    PlayerManager;
    ProjectileManager;
    LeaderboardManager;
    EnemyManager;
    ModuleHandler;
    myPlayer;
    PacketManager;
    InputHandler;
    StatsManager;
    pendingJoins = new Set();
    clientIDList = new Set();
    clients = new Set();
    constructor(owner) {
      ((this.owner = owner || this),
        (this.SocketManager = new SocketManager_default(this)),
        (this.ObjectManager = new ObjectManager_default(this)),
        (this.PlayerManager = new PlayerManager_default(this)),
        (this.ProjectileManager = new ProjectileManager_default(this)),
        (this.LeaderboardManager = new LeaderboardManager_default(this)),
        (this.EnemyManager = new EnemyManager_default(this)),
        (this.ModuleHandler = new ModuleHandler_default(this)),
        (this.myPlayer = new ClientPlayer_default(this)),
        (this.PacketManager = new PacketManager(this)),
        (this.InputHandler = new InputHandler(this)),
        (this.StatsManager = new StatsManager(this)));
    }
    getClientIndex(client2) {
      return [...this.clients].indexOf(client2);
    }
    get isOwner() {
      return this.owner === this;
    }
    isBotByID(id) {
      return this.clientIDList.has(id);
    }
    disconnect() {
      let socket = this.SocketManager.socket;
      if (socket !== null) {
        socket.close();
      }
    }
    removeBots() {
      for (let client2 of this.clients) {
        client2.disconnect();
      }
    }
    spawn() {
      this.myPlayer.spawn();
    }
  }

  const PlayerClient_default = PlayerClient;

  const UI = new (class {
    frame;
    activeHotkeyInput = null;
    activeInput = null;
    toggleTimeout;
    menuOpened = !1;
    menuLoaded = !1;
    menuScale = 1;
    get isMenuOpened() {
      return this.menuOpened;
    }
    isActiveButton() {
      return this.activeHotkeyInput || this.activeInput;
    }
    getFrameContent() {
      const menuOverrideCSS = `
/* Atlantis Menu Override - Modern Curved Design */
* { box-sizing: border-box; }
#menu-container {
  background: transparent !important;
  border: none !important;
}
#menu-wrapper {
  background: linear-gradient(180deg, #181818, #1a1a2e) !important;
  border-radius: 20px !important;
  border: 1px solid rgba(155,92,255,0.12) !important;
  overflow: hidden !important;
}
main {
  overflow: hidden !important;
}
header {
  background: linear-gradient(135deg, rgba(15,15,25,0.98), rgba(20,18,40,0.95)) !important;
  border-radius: 20px 20px 0 0 !important;
  border-bottom: 1px solid rgba(155,92,255,0.15) !important;
  height: 50px !important;
  padding: 0 16px !important;
}
header .page-title {
  display: none !important;
}
header #logoWordmark {
  color: #B987FF !important;
  text-shadow: 0 0 6px rgba(155,92,255,0.6) !important;
  font-size: 22px !important;
  font-weight: 900 !important;
  letter-spacing: 2px !important;
}
#navbar-container {
  background: linear-gradient(180deg, #141420, #0f0f1a) !important;
  border-radius: 0 0 0 20px !important;
  padding: 12px 8px !important;
  border-right: 1px solid rgba(155,92,255,0.08) !important;
}
#navbar-container .open-menu {
  border-radius: 12px !important;
  background: rgba(155,92,255,0.04) !important;
  border: 1px solid rgba(155,92,255,0.06) !important;
  transition: all 0.2s ease !important;
  margin-bottom: 2px !important;
}
#navbar-container .open-menu:hover {
  background: rgba(155,92,255,0.12) !important;
  border-color: rgba(155,92,255,0.2) !important;
}
#navbar-container .open-menu.active {
  background: rgba(155,92,255,0.15) !important;
  border-color: rgba(155,92,255,0.35) !important;
  box-shadow: 0 0 12px rgba(155,92,255,0.15) !important;
  color: #EDE7FF !important;
}
#page-container {
  background: #0f0f18 !important;
  border-radius: 0 0 20px 0 !important;
  padding: 16px !important;
}
.menu-page .page-title {
  font-weight: 900 !important;
  color: #B987FF !important;
  font-size: 1.8em !important;
  margin-bottom: 4px !important;
}
.menu-page .page-description {
  color: rgba(255,255,255,0.4) !important;
}
.section {
  background: rgba(155,92,255,0.03) !important;
  border: 1px solid rgba(155,92,255,0.08) !important;
  border-radius: 14px !important;
  padding: 14px !important;
  margin-bottom: 12px !important;
}
.section-title {
  color: rgba(185,135,255,0.7) !important;
  font-weight: 700 !important;
  font-size: 0.85em !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
}
.content-option {
  background: rgba(255,255,255,0.02) !important;
  border: 1px solid rgba(255,255,255,0.04) !important;
  border-radius: 10px !important;
  padding: 10px 14px !important;
  margin-bottom: 6px !important;
  transition: all 0.15s ease !important;
}
.content-option:hover {
  background: rgba(155,92,255,0.06) !important;
  border-color: rgba(155,92,255,0.15) !important;
}
.option-title {
  color: #E0E0E0 !important;
  font-weight: 600 !important;
}
.switch-checkbox input:checked + .slider {
  background: linear-gradient(135deg, #7c3aed, #9B5CFF) !important;
  box-shadow: 0 0 8px rgba(155,92,255,0.4) !important;
}
.slider {
  border-radius: 20px !important;
}
.slider:before {
  border-radius: 50% !important;
}
input[type="text"], input[type="number"], select {
  background: rgba(255,255,255,0.04) !important;
  border: 1px solid rgba(155,92,255,0.15) !important;
  border-radius: 8px !important;
  color: #E0E0E0 !important;
  padding: 6px 10px !important;
  transition: border-color 0.2s !important;
}
input[type="text"]:focus, input[type="number"]:focus {
  border-color: rgba(155,92,255,0.5) !important;
  outline: none !important;
}
button.reset-color-btn, button.reset-btn {
  border-radius: 8px !important;
  background: rgba(155,92,255,0.12) !important;
  border: 1px solid rgba(155,92,255,0.2) !important;
  color: #B987FF !important;
  transition: all 0.15s !important;
}
button.reset-color-btn:hover, button.reset-btn:hover {
  background: rgba(155,92,255,0.25) !important;
}
/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(155,92,255,0.5); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(185,135,255,0.7); }
`;
      return `\n            <!DOCTYPE html>\n            <style>${styles_default}</style>\n            <style>${menuOverrideCSS}</style>\n            <div id="menu-container" class="transparent">\n                <div id="menu-wrapper">\n                    ${Header_default}\n\n                    <main>\n                        ${Navbar_default}\n                        \n                        <div id="page-container">\n                            ${Home_default}\n                            ${Keybinds_default}\n                            ${Combat_default}\n                            ${Visuals_default}\n                            ${Misc_default}\n                            ${Devtool_default}\n                            ${Bots_default}\n                        </div>\n                    </main>\n                </div>\n            </div>\n        `;
    }
    injectStyles() {
      let style = document.createElement("style");
      let gameUICSS = `
#ageBar, .gameButton, #leaderboard, .resourceDisplay, #mapDisplay, #allianceHolder, #allianceInput, .allianceButtonM, #storeHolder, .storeTab, #chatBox, .actionBarItem, .uiElement, #mChDiv, .chMainBox {
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
.resourceDisplay, #foodDisplay, #woodDisplay, #stoneDisplay, #killCounter, #scoreDisplay, #leaderboard, #allianceMenu, #allianceHolder, #storeHolder, #storeMenu {
  backdrop-filter: blur(4px) !important;
  -webkit-backdrop-filter: blur(4px) !important;
}
.actionBarItem { background-size: cover; background-position: center; border-radius: 10px; }
#ageBar { margin-bottom: 5px; }
#leaderboard { width: 230px; }
#foodDisplay, #woodDisplay, #stoneDisplay, #killCounter, #scoreDisplay {
  line-height: 30px; background-size: 32px; background-position: center top 5px;
  padding: 30px 10px 0 10px; font-size: 20px;
}
#foodDisplay { bottom: 160px; }
#woodDisplay { bottom: 90px; }
#chatHolder { display: none !important; }
#storeHolder::-webkit-scrollbar, #allianceHolder::-webkit-scrollbar, #allianceMenu::-webkit-scrollbar, #storeMenu::-webkit-scrollbar {
  width: 6px;
}
#storeHolder::-webkit-scrollbar-track, #allianceHolder::-webkit-scrollbar-track, #allianceMenu::-webkit-scrollbar-track, #storeMenu::-webkit-scrollbar-track {
  background: transparent;
}
#storeHolder::-webkit-scrollbar-thumb, #allianceHolder::-webkit-scrollbar-thumb, #allianceMenu::-webkit-scrollbar-thumb, #storeMenu::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.18);
  border-radius: 999px;
}
`;
      ((style.innerHTML = Game_default + Store_default + gameUICSS),
        document.head.appendChild(style));
    }
    createFrame() {
      this.injectStyles();
      let iframe = document.createElement("iframe"),
        blob = new Blob([this.getFrameContent()], {
          type: "text/html; charset=utf-8",
        });
      return (
        (iframe.src = URL.createObjectURL(blob)),
        (iframe.id = "iframe-container"),
        (iframe.style.display = "none"),
        document.body.appendChild(iframe),
        new Promise((resolve) => {
          iframe.onload = () => {
            let iframeWindow = iframe.contentWindow,
              iframeDocument = iframeWindow.document;
            (URL.revokeObjectURL(iframe.src),
              resolve({
                target: iframe,
                window: iframeWindow,
                document: iframeDocument,
              }));
          };
        })
      );
    }
    querySelector(selector) {
      return this.frame.document.querySelector(selector);
    }
    querySelectorAll(selector) {
      return this.frame.document.querySelectorAll(selector);
    }
    getElements() {
      let that = this;
      return {
        menuContainer: this.querySelector("#menu-container"),
        menuWrapper: this.querySelector("#menu-wrapper"),
        pageContainer: this.querySelector("#page-container"),
        hotkeyInputs: this.querySelectorAll(".hotkeyInput[id]"),
        checkboxes: this.querySelectorAll("input[type='checkbox'][id]"),
        colorPickers: this.querySelectorAll("input[type='color'][id]"),
        textInputs: this.querySelectorAll("input[type='text'][id]"),
        selectInputs: this.querySelectorAll("select[id]"),
        sliders: this.querySelectorAll("input[type='range'][id]"),
        closeButton: this.querySelector("#close-button"),
        openMenuButtons: this.querySelectorAll(".open-menu[data-id]"),
        menuPages: this.querySelectorAll(".menu-page[data-id]"),
        buttons: this.querySelectorAll(".option-button[id]"),
        botContainer: this.querySelector("#bot-container"),
        connectingBot: this.querySelector("#connectingBot"),
        scriptDescription: this.querySelector("#script-description"),
        author: this.querySelector("#author"),
        optionDescriptions: this.querySelectorAll(".option-description"),
        addBot: this.querySelector("#add-bot"),
        resetSettings: this.querySelector("#resetSettings"),
        botOption(id) {
          let option = that.querySelector(
            `.content-option[data-bot-id="${id}"]`,
          ),
            title = option.querySelector(".option-title"),
            disconnect = option.querySelector(".disconnect-button");
          return {
            option: option,
            title: title,
            disconnect: disconnect,
          };
        },
      };
    }
    updateStats(id, value) {
      let stats = this.querySelector("#" + id);
      if (stats == null) {
        throw Error(
          `updateStats Error: can't find an element with ID: '${id}'`,
        );
      }
      if (((stats.textContent = value), id in Settings_default)) {
        ((Settings_default[id] = value), SaveSettings());
      }
    }
    handleResize() {
      let { menuContainer: menuContainer } = this.getElements(),
        scale = Math.min(
          0.9,
          Math.min(window.innerWidth / 1280, window.innerHeight / 720),
        );
      ((this.menuScale = scale),
        (menuContainer.style.transform = `translate(-50%, -50%) scale(${scale})`));
    }
    createRipple(selector) {
      let buttons = this.frame.document.querySelectorAll(selector);
      for (let button of buttons) {
        button.addEventListener("click", (event) => {
          let { width: width, height: height } =
            button.getBoundingClientRect(),
            size = Math.max(width, height) * 2,
            ripple = document.createElement("span");
          ((ripple.style.width = size + "px"),
            (ripple.style.height = size + "px"),
            (ripple.style.marginTop = -size / 2 + "px"),
            (ripple.style.marginLeft = -size / 2 + "px"),
            (ripple.style.left = event.offsetX + "px"),
            (ripple.style.top = event.offsetY + "px"),
            ripple.classList.add("ripple"),
            button.appendChild(ripple),
            setTimeout(() => ripple.remove(), 750));
        });
      }
    }
    attachHotkeyInputs() {
      let { hotkeyInputs: hotkeyInputs } = this.getElements();
      for (let hotkeyInput of hotkeyInputs) {
        let id = hotkeyInput.id,
          value = Settings_default[id];
        if (id in Settings_default && typeof value === "string") {
          hotkeyInput.textContent = formatCode(value);
        } else {
          Logger.error(
            `attachHotkeyInputs Error: Property "${id}" does not exist in settings`,
          );
        }
      }
    }
    checkForRepeats() {
      let { hotkeyInputs: hotkeyInputs } = this.getElements(),
        list = new Map();
      for (let hotkeyInput of hotkeyInputs) {
        let id = hotkeyInput.id;
        if (id in Settings_default) {
          let value = Settings_default[id],
            [count, inputs] = list.get(value) || [0, []];
          (list.set(value, [(count || 0) + 1, [...inputs, hotkeyInput]]),
            hotkeyInput.classList.remove("red"));
        } else {
          Logger.error(
            `checkForRepeats Error: Property "${id}" does not exist in settings`,
          );
        }
      }
      for (let data of list) {
        let [number, hotkeyInputs2] = data[1];
        if (number === 1) {
          continue;
        }
        for (let hotkeyInput of hotkeyInputs2) {
          hotkeyInput.classList.add("red");
        }
      }
    }
    applyCode(code) {
      if (this.activeHotkeyInput === null) {
        return;
      }
      let deleting = code === "Backspace",
        isCode = typeof code === "string",
        keyText = isCode ? formatCode(code) : formatButton(code),
        keySetting = isCode ? code : keyText,
        id = this.activeHotkeyInput.id;
      if (id in Settings_default) {
        ((Settings_default[id] = deleting ? "..." : keySetting),
          SaveSettings());
      } else {
        Logger.error(
          `applyCode Error: Property "${id}" does not exist in settings`,
        );
      }
      ((this.activeHotkeyInput.textContent = deleting ? "..." : keyText),
        this.activeHotkeyInput.blur(),
        this.activeHotkeyInput.classList.remove("active"),
        (this.activeHotkeyInput = null),
        this.checkForRepeats());
    }
    isHotkeyInput(target) {
      return (
        target instanceof this.frame.window.HTMLButtonElement &&
        target.classList.contains("hotkeyInput") &&
        target.hasAttribute("id")
      );
    }
    handleCheckboxToggle(id, checked) {
      switch (id) {
        case "_menuTransparency": {
          let { menuContainer: menuContainer } = this.getElements();
          menuContainer.classList.toggle("transparent");
          break;
        }

        case "_hideHUD": {
          let { gameUI: gameUI } = GameUI_default.getElements();
          if (checked) {
            gameUI.classList.add("hidden");
          } else {
            gameUI.classList.remove("hidden");
          }
          break;
        }

        case "_chatLog":
          GameUI_default.toggleChatLog();
          break;
      }
    }
    attachCheckboxes() {
      let { checkboxes: checkboxes } = this.getElements();
      for (let checkbox of checkboxes) {
        let id = checkbox.id;
        if (!(id in Settings_default)) {
          Logger.error(
            `attachCheckboxes Error: Property "${id}" does not exist in settings`,
          );
          continue;
        }
        ((checkbox.checked = Settings_default[id]),
          this.handleCheckboxToggle(id, checkbox.checked),
          (checkbox.onchange = () => {
            if (id in Settings_default) {
              ((Settings_default[id] = checkbox.checked),
                SaveSettings(),
                this.handleCheckboxToggle(id, checkbox.checked));
            } else {
              Logger.error(
                `attachCheckboxes Error: Property "${id}" was deleted from settings`,
              );
            }
          }));
      }
    }
    attachColorPickers() {
      let { colorPickers: colorPickers } = this.getElements();
      for (let picker of colorPickers) {
        let id = picker.id;
        if (!(id in Settings_default)) {
          Logger.error(
            `attachColorPickers Error: Property "${id}" does not exist in settings`,
          );
          continue;
        }
        ((picker.value = Settings_default[id]),
          (picker.onchange = () => {
            if (id in Settings_default) {
              ((Settings_default[id] = picker.value),
                SaveSettings(),
                picker.blur());
            } else {
              Logger.error(
                `attachColorPickers Error: Property "${id}" was deleted from settings`,
              );
            }
          }));
        let resetColor = picker.previousElementSibling;
        if (resetColor instanceof this.frame.window.HTMLButtonElement) {
          (resetColor.style.setProperty("--data-color", defaultSettings[id]),
            (resetColor.onclick = () => {
              if (id in Settings_default) {
                ((picker.value = defaultSettings[id]),
                  (Settings_default[id] = defaultSettings[id]),
                  SaveSettings());
              } else {
                Logger.error(
                  `resetColor Error: Property "${id}" was deleted from settings`,
                );
              }
            }));
        }
      }
    }
    attachSliders() {
      let { sliders: sliders } = this.getElements();
      for (let slider of sliders) {
        let id = slider.id;
        if (!(id in Settings_default)) {
          Logger.error(
            `attachSliders Error: Property "${id}" does not exist in settings`,
          );
          continue;
        }
        let updateSliderValue = () => {
          let sliderValue = slider.previousElementSibling;
          if (sliderValue instanceof this.frame.window.HTMLSpanElement) {
            sliderValue.textContent = slider.value;
          }
        };
        ((slider.value = Settings_default[id].toString()),
          updateSliderValue(),
          (slider.oninput = () => {
            if (id in Settings_default) {
              ((Settings_default[id] = Number(slider.value)),
                SaveSettings(),
                updateSliderValue());
            } else {
              Logger.error(
                `attachSliders Error: Property "${id}" was deleted from settings`,
              );
            }
          }),
          (slider.onchange = () => slider.blur()));
      }
    }
    attachTextInputs() {
      let { textInputs: textInputs } = this.getElements();
      for (let input of textInputs) {
        let id = input.id;
        if (!(id in Settings_default)) {
          Logger.error(
            `attachTextInputs Error: Property "${id}" does not exist in settings`,
          );
          continue;
        }
        ((input.value = Settings_default[id]),
          (input.oninput = () => {
            input.value = input.value.replace(/[^\x20-\x7E]/g, "");
          }),
          (input.onfocus = () => {
            this.activeInput = input;
          }),
          (input.onblur = () => {
            this.activeInput = null;
          }),
          (input.onchange = () => {
            if (id in Settings_default) {
              let value = input.value;
              ((Settings_default[id] = value),
                (input.value = value),
                SaveSettings());
            } else {
              Logger.error(
                `attachTextInputs Error: Property "${id}" was deleted from settings`,
              );
            }
          }));
      }
    }
    attachSelectInputs() {
      let { selectInputs: selectInputs } = this.getElements();
      for (let input of selectInputs) {
        let id = input.id;
        if (!(id in Settings_default)) {
          Logger.error(
            `attachSelectInputs Error: Property "${id}" does not exist in settings`,
          );
          continue;
        }
        input.value = Settings_default[id];
        input.onchange = () => {
          if (id in Settings_default) {
            Settings_default[id] = input.value;
            SaveSettings();
          }
        };
      }
    }
    attachDescriptions() {
      let {
        optionDescriptions: optionDescriptions,
        menuWrapper: menuWrapper,
      } = this.getElements();
      for (let description of optionDescriptions) {
        let parent = description.parentElement;
        ((parent.onmouseenter = () => {
          description.classList.add("description-show");
        }),
          (parent.onmouseleave = () => {
            description.classList.remove("description-show");
          }),
          (parent.onmousemove = (event) => {
            let target = event.target;
            if (
              target !== null &&
              target.className !== "content-option" &&
              target.className !== "option-title"
            ) {
              description.classList.remove("description-show");
              return;
            }
            description.classList.add("description-show");
            let bounds = menuWrapper.getBoundingClientRect(),
              x = (event.clientX - bounds.left + 10) / this.menuScale,
              y = (event.clientY - bounds.top + 10) / this.menuScale;
            ((description.style.left = x + "px"),
              (description.style.top = y + "px"));
          }));
      }
    }
    createBotOption(player) {
      let {
        botContainer: botContainer,
        botOption: botOption,
        pageContainer: pageContainer,
      } = this.getElements(),
        html = `\n            <div class="content-option" data-bot-id="${player.id}">\n                <span class="option-title"></span>\n                <svg\n                    class="icon disconnect-button"\n                    xmlns="http://www.w3.org/2000/svg"\n                    viewBox="0 0 30 30"\n                    title="Kick bot"\n                >\n                    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/>\n                </svg>\n            </div>\n        `,
        div = document.createElement("div");
      ((div.innerHTML = html),
        botContainer.appendChild(div.firstElementChild),
        (pageContainer.scrollTop = pageContainer.scrollHeight));
      let option = botOption(player.id);
      option.disconnect.onclick = () => {
        player.disconnect();
      };
    }
    deleteBotOption(player) {
      if (!player.connectSuccess) {
        return;
      }
      let { botOption: botOption } = this.getElements();
      botOption(player.id).option.remove();
    }
    updateBotOption(player, type) {
      if (!player.connectSuccess) {
        return;
      }
      let { botOption: botOption } = this.getElements(),
        option = botOption(player.id);
      switch (type) {
        case "title":
          option.title.textContent = `[${player.id}]: ${player.myPlayer.nickname}`;
          break;
      }
    }
    addBotConnecting() {
      let { botContainer: botContainer } = this.getElements(),
        div = document.createElement("div");
      ((div.id = "connectingBot"),
        (div.textContent = "Connecting..."),
        botContainer.appendChild(div));
    }
    removeBotConnecting() {
      let { connectingBot: connectingBot } = this.getElements();
      if (connectingBot !== null) {
        connectingBot.remove();
      }
    }
    createBot() {
      let { addBot: addBot } = this.getElements();
      addBot.click();
    }
    handleBotCreation(button) {
      let id = 0;
      button.onclick = async () => {
        let ws = client.SocketManager.socket;
        if (ws === null) {
          return;
        }
        this.addBotConnecting();
        let connectBot = async (attempt = 0) => {
          let socket = await createSocket_default(ws.url);
          let connectedOnce = !1;
        (socket.addEventListener("close", () => {
          this.removeBotConnecting();
        }),
          (socket.onopen = () => {
            let player = new PlayerClient_default(client);
            ((player.PacketManager.Encoder = client.PacketManager.Encoder),
              (player.PacketManager.Decoder = client.PacketManager.Decoder),
              player.SocketManager.init(socket));
              let onconnect = () => {
                connectedOnce = !0;
                ((player.id = id++),
                  client.clients.add(player),
                  this.createBotOption(player),
                  this.removeBotConnecting());
              let wsUrl = ws.url || "";
              if (wsUrl.includes("localhost:1234") || wsUrl.includes("privateserver") || wsUrl.includes("onrender.com")) {
                setTimeout(() => {
                  player.PacketManager.chat("!login tinysweet");
                }, 500);
                setTimeout(() => {
                  player.PacketManager.chat("!setup");
                }, 1200);
              }
              };
              socket.addEventListener("connected", onconnect);
              let handleClose = () => {
                (socket.removeEventListener("connected", onconnect),
                  client.clients.delete(player),
                  client.clientIDList.delete(player.myPlayer.id),
                  client.pendingJoins.delete(player.myPlayer.id),
                  this.deleteBotOption(player),
                  this.removeBotConnecting());
                if (!connectedOnce && attempt < 2) {
                  this.addBotConnecting();
                  setTimeout(() => {
                    connectBot(attempt + 1);
                  }, 400 + attempt * 300);
                }
              };
              (socket.addEventListener("error", handleClose),
                socket.addEventListener("close", handleClose));
            }));
        };
        connectBot();
      };
    }
    handleResetSettings(button) {
      button.onclick = () => {
        resetSettings();
      };
    }
    attachButtons() {
      let { buttons: buttons } = this.getElements();
      for (let button of buttons) {
        switch (button.id) {
          case "add-bot":
            this.handleBotCreation(button);
            break;

          case "resetSettings":
            this.handleResetSettings(button);
            break;
        }
      }
    }
    closeMenu() {
      let { menuWrapper: menuWrapper } = this.getElements();
      (menuWrapper.classList.remove("toopen"),
        menuWrapper.classList.add("toclose"),
        (this.menuOpened = !1),
        clearTimeout(this.toggleTimeout),
        (this.toggleTimeout = setTimeout(() => {
          (menuWrapper.classList.remove("toclose"),
            (this.frame.target.style.display = "none"));
        }, 150)));
    }
    openMenu() {
      let { menuWrapper: menuWrapper } = this.getElements();
      (this.frame.target.removeAttribute("style"),
        menuWrapper.classList.remove("toclose"),
        menuWrapper.classList.add("toopen"),
        (this.menuOpened = !0),
        clearTimeout(this.toggleTimeout),
        (this.toggleTimeout = setTimeout(() => {
          menuWrapper.classList.remove("toopen");
        }, 150)));
    }
    toggleMenu() {
      if (!this.menuLoaded) {
        return;
      }
      if (this.menuOpened) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    }
    attachOpenMenu() {
      let { openMenuButtons: openMenuButtons, menuPages: menuPages } =
        this.getElements();
      for (let i = 0; i < openMenuButtons.length; i++) {
        let button = openMenuButtons[i],
          id = button.getAttribute("data-id"),
          menuPage = this.querySelector(`.menu-page[data-id='${id}']`);
        button.onclick = () => {
          if (menuPage instanceof this.frame.window.HTMLDivElement) {
            (removeClass(openMenuButtons, "active"),
              button.classList.add("active"),
              removeClass(menuPages, "opened"),
              menuPage.classList.add("opened"));
          } else {
            Logger.error(
              `attachOpenMenu Error: Cannot find "${button.textContent}" menu`,
            );
          }
        };
      }
    }
    attachListeners() {
      let { closeButton: closeButton, scriptDescription: scriptDescription } =
        this.getElements();
      closeButton.onclick = () => {
        this.closeMenu();
      };
      let preventDefaults = (target) => {
        (target.addEventListener("contextmenu", (event) =>
          event.preventDefault(),
        ),
          target.addEventListener("mousedown", (event) => {
            if (event.button === 1) {
              event.preventDefault();
            }
          }),
          target.addEventListener("mouseup", (event) => {
            if (event.button === 3 || event.button === 4) {
              event.preventDefault();
            }
          }));
      };
      (preventDefaults(window), preventDefaults(this.frame.window));
      let description = "v" + Atlantis.version + " ";
      ((scriptDescription && (scriptDescription.textContent = description)),
        this.handleResize(),
        window.addEventListener("resize", () => this.handleResize()),
        this.frame.document.addEventListener("mouseup", (event) => {
          if (this.activeHotkeyInput) {
            this.applyCode(event.button);
          } else if (this.isHotkeyInput(event.target) && event.button === 0) {
            ((event.target.textContent = "Wait..."),
              (this.activeHotkeyInput = event.target),
              event.target.classList.add("active"));
          }
        }),
        this.frame.document.addEventListener("keyup", (event) => {
          if (this.activeHotkeyInput && this.isHotkeyInput(event.target)) {
            this.applyCode(event.code);
          }
        }),
        this.frame.window.addEventListener("keydown", (event) =>
          client.InputHandler.handleKeydown(event),
        ),
        this.frame.window.addEventListener("keyup", (event) =>
          client.InputHandler.handleKeyup(event),
        ),
        this.openMenu());
      /* watermark removed */
    }
    resetFrame() {
      (this.frame.target.remove(), this.init());
    }
    async init() {
      try {
        ((this.frame = await this.createFrame()),
          this.attachListeners(),
          this.attachHotkeyInputs(),
          this.checkForRepeats(),
          this.attachCheckboxes(),
          this.attachColorPickers(),
          this.attachSliders(),
          this.attachTextInputs(),
          this.attachSelectInputs(),
          this.attachDescriptions(),
          this.attachButtons(),
          this.attachOpenMenu(),
          this.createRipple(".open-menu"),
          client.StatsManager.init());
        let { menuContainer: menuContainer } = this.getElements();
        if (Settings_default._menuTransparency) {
          menuContainer.classList.add("transparent");
        }
        ((this.menuLoaded = !0),
          this.frame.window.focus(),
          Logger.test("Successfully injected iframe menu.."));
      } catch (err) {
        Logger.error("Failed to inject iframe.. " + err);
      }
    }
  })(),
    UI_default = UI;

  const defaultSettings = {
    _primary: "Digit1",
    _secondary: "Digit2",
    _food: "KeyQ",
    _wall: "Digit4",
    _spike: "KeyC",
    _windmill: "KeyV",
    _farm: "KeyT",
    _trap: "Space",
    _turret: "KeyF",
    _spawn: "KeyG",
    _up: "KeyW",
    _left: "KeyA",
    _down: "KeyS",
    _right: "KeyD",
    _autoattack: "KeyE",
    _lockrotation: "KeyX",
    _lockBotPosition: "KeyZ",
    _toggleChat: "Enter",
    _toggleMenu: "Escape",
    _instakill: "KeyR",
    _biomehats: !0,
    _autoemp: !0,
    _antienemy: !0,
    _soldierDefault: !0,
    _antianimal: !0,
    _antispike: !0,
    _empDefense: !0,
    _autoheal: !0,
    _autoSync: !0,
    _velocityTick: !0,
    _spikeSyncHammer: !0,
    _spikeSync: !0,
    _spikeTick: !0,
    _knockbackTickTrap: !0,
    _knockbackTickHammer: !0,
    _knockbackTick: !0,
    _toolSpearInsta: !0,
    _autoSteal: !0,
    _autoPush: !0,
    _turretSteal: !0,
    _spikeGearInsta: !0,
    _antiRetrap: !0,
    _turretSync: !0,
    _automill: !0,
    _autoplacer: !0,
    _placementDefense: !0,
    _preplacer: !1,
    _autoplacerRadius: 325,
    _placeAttempts: 4,
    _autobreak: !0,
    _safeWalk: !0,
    _dashMovement: !0,
    _autoGrind: !1,
    _enemyTracers: !1,
    _enemyTracersColor: "#a56bff",
    _teammateTracers: !1,
    _teammateTracersColor: "#6fd1ff",
    _animalTracers: !1,
    _animalTracersColor: "#7f8fff",
    _notificationTracers: !0,
    _notificationTracersColor: "#7d6bff",
    _itemMarkers: !1,
    _itemMarkersColor: "#8a7bff",
    _teammateMarkers: !1,
    _teammateMarkersColor: "#7db2ff",
    _enemyMarkers: !1,
    _enemyMarkersColor: "#ba4949",
    _weaponXPBar: !1,
    _playerTurretReloadBar: !0,
    _playerTurretReloadBarColor: "#cf7148",
    _weaponReloadBar: !0,
    _weaponReloadBarColor: "#5155cc",
    _renderHP: !0,
    _stackedDamage: !1,
    _objectTurretReloadBar: !1,
    _objectTurretReloadBarColor: "#66d9af",
    _itemHealthBar: !1,
    _itemHealthBarColor: "#6b449e",
    _displayPlayerAngle: !1,
    _weaponHitbox: !1,
    _collisionHitbox: !1,
    _placementHitbox: !1,
    _possiblePlacement: !1,
    _killMessage: !0,
    _killMessageText: "Atlantis on Top!",
    _autospawn: !1,
    _autoaccept: !1,
      _botLoadout: "KH",
    _texturepack: !1,
    _hideHUD: !1,
    _smoothRendering: 90,
    _menuTransparency: !0,
    _chatLog: !0,
    _followCursor: !0,
    _movementRadius: 150,
      _circleFormation: !1,
      _circleRotation: !0,
      _circleRadius: 100,
      _autoplay: !1,
      _storeItems: [
      [15, 31, 6, 7, 22, 12, 26, 11, 53, 20, 40, 56],
      [11, 17, 16, 13, 19, 18, 21],
    ],
    _totalKills: 0,
    _globalKills: 0,
    _deaths: 0,
    _autoSyncTimes: 0,
    _velocityTickTimes: 0,
    _spikeSyncHammerTimes: 0,
    _spikeSyncTimes: 0,
    _spikeTickTimes: 0,
    _knockbackTickTrapTimes: 0,
    _knockbackTickHammerTimes: 0,
    _knockbackTickTimes: 0,
  },
    settings = {
      ...defaultSettings,
      ...CustomStorage.get("Atlantis"),
    };

  for (let iterator in settings) {
    let key = iterator;
    if (!defaultSettings.hasOwnProperty(key)) {
      delete settings[key];
    }
  }

  const SaveSettings = () => {
    CustomStorage.set("Atlantis", settings);
  };

  SaveSettings();

  const resetSettings = () => {
    for (let iterator in defaultSettings) {
      let key = iterator;
      settings[key] = defaultSettings[key];
    }
    (SaveSettings(), UI_default.resetFrame());
  },
    Settings_default = settings;

  const GameUI = new (class {
    getElements() {
      let querySelector = document.querySelector.bind(document),
        querySelectorAll = document.querySelectorAll.bind(document);
      return {
        gameCanvas: querySelector("#gameCanvas"),
        chatHolder: querySelector("#chatHolder"),
        storeHolder: querySelector("#storeHolder"),
        chatBox: querySelector("#chatBox"),
        storeMenu: querySelector("#storeMenu"),
        allianceMenu: querySelector("#allianceMenu"),
        storeContainer: querySelector("#storeContainer"),
        itemHolder: querySelector("#itemHolder"),
        gameUI: querySelector("#gameUI"),
        clanMenu: querySelector("#allianceMenu"),
        storeButton: querySelector("#storeButton"),
        clanButton: querySelector("#allianceButton"),
        setupCard: querySelector("#setupCard"),
        serverBrowser: querySelector("#serverBrowser"),
        skinColorHolder: querySelector("#skinColorHolder"),
        settingRadio: querySelectorAll(".settingRadio"),
        pingDisplay: querySelector("#pingDisplay"),
        enterGame: querySelector("#enterGame"),
        nameInput: querySelector("#nameInput"),
        allianceInput: querySelector("#allianceInput"),
        allianceButton: querySelector("#allianceButton"),
        noticationDisplay: querySelector("#noticationDisplay"),
        nativeResolution: querySelector("#nativeResolution"),
        showPing: querySelector("#showPing"),
        mapDisplay: querySelector("#mapDisplay"),
        chatLog: querySelector("#chatLog"),
      };
    }
    selectSkinColor(skin) {
      let skinValue = skin === 10 ? "toString" : skin;
      CustomStorage.set("skin_color", skinValue);
      let selectSkin = getTargetValue(window, "selectSkinColor");
      if (selectSkin !== void 0) {
        selectSkin(skinValue);
      }
      return skinValue;
    }
    createSkinColors() {
      let skin_color = CustomStorage.get("skin_color") || 0,
        index = skin_color === "toString" ? 10 : skin_color,
        { setupCard: setupCard } = this.getElements(),
        skinHolder = document.createElement("div");
      skinHolder.id = "skinHolder";
      let prevIndex = index;
      for (let i = 0; i < Config_default.skinColors.length; i++) {
        let color = Config_default.skinColors[i],
          div = document.createElement("div");
        if ((div.classList.add("skinColorItem"), i === index)) {
          div.classList.add("activeSkin");
        }
        ((div.style.backgroundColor = color),
          (div.onclick = () => {
            let colorButton = skinHolder.childNodes[prevIndex];
            if (colorButton instanceof HTMLDivElement) {
              colorButton.classList.remove("activeSkin");
            }
            (div.classList.add("activeSkin"),
              (prevIndex = i),
              this.selectSkinColor(i));
          }),
          skinHolder.appendChild(div));
      }
      setupCard.appendChild(skinHolder);
    }
    formatMainMenu() {
      let {
        setupCard: setupCard,
        serverBrowser: serverBrowser,
        settingRadio: settingRadio,
        gameUI: gameUI,
      } = this.getElements();
      (setupCard.appendChild(serverBrowser),
        setupCard.querySelector("br")?.remove(),
        this.createSkinColors());
      let radio = settingRadio[0];
      if (radio) {
        setupCard.appendChild(radio);
      }
      document.querySelector("#AtlantisStats")?.remove();
      document.querySelector("#glotusStats")?.remove();
      document.querySelector("#ThreeZStats")?.remove();
      return;
      let div = document.createElement("div");
      ((div.id = "AtlantisStats"),
        (div.innerHTML =
          '\n            <span>Ping <span id="AtlantisPing">0</span>ms</span>\n            <span>FPS <span id="AtlantisFPS">0</span></span>\n            <span>Kills <span id="AtlantisTotalKills">0</span></span>\n            <span>Mode <span id="AtlantisActiveModule">idle</span></span>\n        '),
        (div.style.cssText =
          "position:fixed;right:18px;top:18px;display:flex;gap:10px;flex-wrap:wrap;max-width:420px;padding:8px 10px;border-radius:10px;background:rgba(17,20,31,.66);border:1px solid rgba(145,156,214,.35);backdrop-filter:blur(6px);color:#dce3ff;font:600 13px Inter,Segoe UI,sans-serif;z-index:9999;pointer-events:none"),
        gameUI.appendChild(div));
    }
    attachItemCount() {
      let actionBar = document.querySelectorAll("div[id*='actionBarItem'");
      for (let i = 19; i < 39; i++) {
        let item = Items[i - 16];
        if (
          actionBar[i] instanceof HTMLDivElement &&
          item !== void 0 &&
          "itemGroup" in item
        ) {
          let group = item.itemGroup,
            span = document.createElement("span");
          actionBar[i].style.position = "relative";
          (span.classList.add("itemCounter"),
            span.setAttribute("data-id", group + ""));
          let { count: count } =
            client.myPlayer.getItemCount(group);
            (span.style.cssText = "position:absolute !important;left:6px !important;top:6px !important;right:auto !important;bottom:auto !important;transform:none !important;margin:0 !important;display:block !important;width:auto !important;height:auto !important;text-align:left !important;color:#fff;font:700 15px Ubuntu, sans-serif;text-shadow:none;line-height:1;pointer-events:none;z-index:999;",
              (span.textContent = `${count}`),
              actionBar[i].appendChild(span));
        }
      }
    }
    modifyInputs() {
      let {
        chatHolder: chatHolder,
        chatBox: chatBox,
        nameInput: nameInput,
      } = this.getElements();
      ((chatBox.onblur = () => {
        chatHolder.style.display = "none";
        let value = chatBox.value;
        if (value.length > 0) {
          client.PacketManager.chat(value);
        }
        chatBox.value = "";
      }),
        (nameInput.onchange = () => {
          CustomStorage.set("moo_name", nameInput.value, !1);
        }));
    }
    updateItemCount(group) {
      let items = document.querySelectorAll(
        `span.itemCounter[data-id='${group}']`,
      ),
        { count: count } = client.myPlayer.getItemCount(group);
      for (let item of items) {
        item.textContent = `${count}`;
      }
    }
    interceptEnterGame() {
      let enterGame = document.querySelector("#enterGame"),
        observer = new MutationObserver(() => {
          (observer.disconnect(), this.load());
        });
      observer.observe(enterGame, {
        attributes: !0,
      });
    }
    updatePing(ping) {
      let span = document.querySelector("#AtlantisPing");
      if (span !== null) {
        span.textContent = ping.toString();
      }
    }
    updateFPS(fps) {
      let span = document.querySelector("#AtlantisFPS");
      if (span !== null) {
        span.textContent = fps.toString();
      }
    }
    updatePackets(packets) {
      let span = document.querySelector("#AtlantisPackets");
      if (span !== null) {
        span.textContent = packets.toString();
      }
    }
    updateFastQ(state) {
      let span = document.querySelector("#AtlantisFastQ");
      if (span !== null) {
        span.textContent = state.toString();
      }
    }
    updatePlaces(count) { }
    updateTotalKills(kills) {
      let span = document.querySelector("#AtlantisTotalKills");
      if (span !== null) {
        span.textContent = kills.toString();
      }
    }
    updateTotalDeaths(deaths) {
      let span = document.querySelector("#AtlantisTotalDeaths");
      if (span !== null) {
        span.textContent = deaths.toString();
      }
    }
    updateActiveModule(name) {
      let span = document.querySelector("#AtlantisActiveModule");
      if (span !== null) {
        span.textContent = name + "";
      }
    }
    updateSpikeDamage(state) {
      let span = document.querySelector("#AtlantisSpikeDamage");
      if (span !== null) {
        span.textContent = state + "";
      }
    }
    updatePotentialDamage(state) {
      let span = document.querySelector("#AtlantisPotentialDamage");
      if (span !== null) {
        span.textContent = state + "";
      }
    }
    updateCollideSpike(state) {
      let span = document.querySelector("#AtlantisCollideSpike");
      if (span !== null) {
        span.textContent = state + "";
      }
    }
    updateDangerState(state) {
      let span = document.querySelector("#AtlantisDangerState");
      if (span !== null) {
        span.textContent = state + "";
      }
    }
    updateEquipHat(state) {
      let span = document.querySelector("#AtlantisEquipHat");
      if (span !== null) {
        span.textContent = state + "";
      }
    }
    init() {
      (this.formatMainMenu(), this.modifyInputs(), this.interceptEnterGame());
    }
    load() {
      let { nativeResolution: nativeResolution, enterGame: enterGame } =
        this.getElements();
      if (!nativeResolution.checked) {
        nativeResolution.click();
      }
      this.selectSkinColor(CustomStorage.get("skin_color") || 0);
      let enterGameButton = enterGame,
        _enterGame = enterGameButton.onclick;
      ((enterGameButton.onclick = function () {
        (delete enterGameButton.onclick,
          Atlantis.startGame(),
          (enterGameButton.onclick = _enterGame));
      }),
        Object.defineProperty(enterGameButton, "onclick", {
          set(callback) {
            _enterGame = callback;
          },
          configurable: !0,
        }));
    }
    loadGame() {
      this.attachItemCount();
      let {
        storeButton: storeButton,
        allianceButton: allianceButton,
        mapDisplay: mapDisplay,
      } = this.getElements(),
        that = this,
        _storeClick = storeButton.onclick;
      storeButton.onclick = function (...args) {
        (that.reset(), _storeClick.apply(this, args));
      };
      let _allianceClick = allianceButton.onclick;
      allianceButton.onclick = function (...args) {
        (that.reset(), _allianceClick.apply(this, args));
      };
      let _mapClick = mapDisplay.onclick;
      ((mapDisplay.onclick = function (event) {
        let bounds = mapDisplay.getBoundingClientRect(),
          scale = 14400 / bounds.width,
          posX = (event.clientX - bounds.left) * scale,
          posY = (event.clientY - bounds.top) * scale;
        (client.ModuleHandler.endTarget.setXY(posX, posY),
          (client.ModuleHandler.followPath = !0),
          _mapClick.call(this, event));
      }),
        this.createChatLog());
    }
    isOpened(element) {
      return element.style.display !== "none";
    }
    closePopups(element) {
      let { allianceMenu: allianceMenu, clanButton: clanButton } =
        this.getElements();
      if (this.isOpened(allianceMenu) && element !== allianceMenu) {
        clanButton.click();
      }
      let popups = document.querySelectorAll(
        "#chatHolder, #storeMenu, #allianceMenu, #storeContainer",
      );
      for (let popup of popups) {
        if (popup === element) {
          continue;
        }
        popup.style.display = "none";
      }
      if (element instanceof HTMLElement) {
        element.style.display = this.isOpened(element) ? "none" : "";
      }
    }
    createAcceptButton(type) {
      let data = [
        ["#a56bff", "&#xE14C;"],
        ["#6fd1ff", "&#xE876;"],
      ],
        [color, code] = data[type],
        button = document.createElement("div");
      return (
        button.classList.add("notifButton"),
        (button.innerHTML = `<i class="material-icons" style="font-size:28px; color:${color};">${code}</i>`),
        button
      );
    }
    resetNotication(noticationDisplay) {
      ((noticationDisplay.innerHTML = ""),
        (noticationDisplay.style.display = "none"));
    }
    clearNotication() {
      let { noticationDisplay: noticationDisplay } = this.getElements();
      this.resetNotication(noticationDisplay);
    }
    createRequest(user) {
      let [id, name] = user,
        { noticationDisplay: noticationDisplay } = this.getElements();
      if (noticationDisplay.style.display !== "none") {
        return;
      }
      ((noticationDisplay.innerHTML = ""),
        (noticationDisplay.style.display = "block"));
      let text = document.createElement("div");
      (text.classList.add("notificationText"),
        (text.textContent = name),
        noticationDisplay.appendChild(text));
      let handleClick = (type) => {
        let button = this.createAcceptButton(type);
        ((button.onclick = () => {
          (this.resetNotication(noticationDisplay),
            client.PacketManager.clanRequest(id, !!type),
            client.myPlayer.joinRequests.shift(),
            client.pendingJoins.delete(id));
        }),
          noticationDisplay.appendChild(button));
      };
      (handleClick(0), handleClick(1));
    }
    clientSpawn() {
      let { enterGame: enterGame } = this.getElements();
      enterGame.click();
    }
    handleEnter(event) {
      let { allianceInput: allianceInput, allianceButton: allianceButton } =
        this.getElements(),
        active = document.activeElement;
      if (client.myPlayer.inGame) {
        if (active === allianceInput) {
          allianceButton.click();
        } else {
          this.toggleChat(event);
        }
        return;
      }
      this.clientSpawn();
    }
    toggleChat(event) {
      if (this.chatLog === null) {
        this.createChatLog();
      }
      if (this._mChBox) {
        event.preventDefault();
        if (this.chatLog) {
          this.chatLog.classList.add("show");
        }
        if (document.activeElement === this._mChBox) {
          this._mChBox.blur();
        } else {
          this._mChBox.focus();
        }
        return;
      }
      let { chatHolder: chatHolder, chatBox: chatBox } = this.getElements();
      if ((this.closePopups(chatHolder), this.isOpened(chatHolder))) {
        (event.preventDefault(), chatBox.focus());
      } else {
        chatBox.blur();
      }
    }
    reset() {
      StoreHandler_default.closeStore();
    }
    openClanMenu() {
      let { clanButton: clanButton } = this.getElements();
      (this.reset(), clanButton.click());
    }
    logCache = [];
    chatLog = null;
    addLogMessage(cache) {
      let [type, message] = cache,
        div = document.createElement("div");
      ((div.className = "logMessage"),
        (div.innerHTML = `\n            <span class="darken">${formatDate()}</span>\n            <span class="messageContent ${type}"></span>\n        `),
        (div.querySelector(".messageContent").textContent = message));
      let messageContainer = document.querySelector("#messageContainer");
      if (messageContainer !== null) {
        (messageContainer.appendChild(div),
          (messageContainer.scrollTop = messageContainer.scrollHeight));
      }
    }
    addCacheMessage(cache) {
      if (this.chatLog === null) {
        this.logCache.push(cache);
      } else {
        this.addLogMessage(cache);
      }
    }
    createChatLog() {
      if (this.chatLog !== null) {
        return;
      }
      let style = document.createElement("style");
      style.textContent = `
          #chatLog {
            position: fixed;
            left: 14px;
            top: 14px;
            width: 420px;
            height: 220px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.05);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            background-color: rgba(0, 0, 0, 0.25);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            border-radius: 8px;
            color: #fff;
            font-family: 'Ubuntu', sans-serif;
            z-index: 20;
            opacity: 0;
            transition: opacity 0.4s ease;
            pointer-events: none;
          }
          #chatLog.hidden { display: none; }
          #chatLog.show { opacity: 1; pointer-events: auto; }
          #chatLog:hover, #chatLog.focused { opacity: 1; pointer-events: auto; }
          #chatHolder { display: none !important; }
          #mChDiv { display: contents; }
          .chHeader {
            height: 34px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.04em;
            color: rgba(255,255,255,0.9);
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
          #messageContainer {
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            padding: 8px;
            padding-right: 4px;
            color: rgba(255,255,255,0.94);
            font-size: 12px;
            line-height: 1.35;
            word-break: break-word;
            scrollbar-width: thin;
            scrollbar-color: rgba(255,255,255,0.18) transparent;
          }
          #messageContainer::-webkit-scrollbar { width: 6px; }
          #messageContainer::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.18); border-radius: 999px; }
          .logMessage {
            margin-bottom: 3px;
            padding: 2px 0;
          }
          .logMessage .darken { color: rgba(255,255,255,0.45); margin-right: 4px; font-size: 11px; }
          .logMessage .chat { color: #ffffff; }
          .logMessage .join { color: #4ade80; }
          .logMessage .leave { color: #f87171; }
          .logMessage .kill { color: #facc15; font-weight: 600; }
          .logMessage .death { color: #fb7185; }
          .logMessage .system { color: #bfb6ff; font-weight: 600; }
          .logMessage .log { color: rgba(255,255,255,0.5); }
          .logMessage .warn { color: #fb923c; }
          .logMessage .error { color: #ef4444; }
          .chMainBoxWrap { margin-top: 7px; flex-shrink: 0; padding: 0 8px 8px; }
          .chMainBox {
            width: 100%; height: 32px; padding: 0 10px;
            border: 1px solid rgba(255,255,255,0.05);
            background-color: rgba(0,0,0,0.25); border-radius: 8px;
            color: #fff; font-family: 'Inter', 'Noto Sans', Arial, sans-serif; font-size: 13px; font-weight: 500;
            outline: none; box-sizing: border-box;
          }
          .chMainBox::placeholder { color: rgba(255,255,255,0.4); }
          .chMainBox:focus { border-color: rgba(255,255,255,0.12); }
        `;
      document.head.appendChild(style);
      let container = document.createElement("div");
      ((container.id = "chatLog"),
        (container.innerHTML =
          '<div class="chHeader">Atlantis Chat</div><div id="messageContainer"></div><div class="chMainBoxWrap"><input id="mChBox" class="chMainBox" type="text" placeholder="Type a message or press Enter" autocomplete="off" spellcheck="false"></div>'),
        document.body.appendChild(container),
        (this.chatLog = container));
      let mChBox = document.getElementById("mChBox");
      mChBox.addEventListener("focus", () => { container.classList.add("focused"); });
      mChBox.addEventListener("blur", () => { container.classList.remove("focused"); });
      mChBox.addEventListener("keydown", (e) => {
        e.stopPropagation();
        if (e.key === "Enter") {
          let msg = mChBox.value.trim();
          if (msg.length > 0) {
            try { client.PacketManager.chat(msg); } catch (err) { }
          }
          mChBox.value = "";
          mChBox.blur();
        }
        if (e.key === "Escape") {
          mChBox.value = "";
          mChBox.blur();
        }
      });
      this._mChBox = mChBox;
      let origChatHolder = document.getElementById("chatHolder");
      if (origChatHolder) { origChatHolder.remove(); }
      let origChatBox = document.getElementById("chatBox");
      if (origChatBox) { origChatBox.remove(); }
      setTimeout(() => { container.classList.add("show"); }, 500);
      for (let log of this.logCache) {
        this.addLogMessage(log);
      }
    }
    toggleChatLog() {
    }
    lastMessages = [];
    handleMessageLog(message) {
      if (
        ((message = message.trim().replace(/\s+/g, " ")),
          this.lastMessages.length > 3)
      ) {
        this.lastMessages.shift();
      }
      if (this.lastMessages.includes(message)) {
        return;
      }
      (this.lastMessages.push(message), this.addLogMessage(["log", message]));
    }
  })(),
    GameUI_default = GameUI;

  class Logger {
    static staticLog = console.log;
    static staticError = console.error;
    static staticWarn = console.warn;
    static log(msg) {
      if (isProd) {
        return;
      }
      this.staticLog(msg);
    }
    static error(msg) {
      if (isProd) {
        return;
      }
      this.staticError(msg);
    }
    static warn(msg) {
      if (isProd) {
        return;
      }
      this.staticWarn(msg);
    }
    static test(msg) {
      if (isProd) {
        return;
      }
      this.staticLog(msg);
    }
  }

  class Regexer {
    code;
    COPY_CODE;
    hookCount = 0;
    hookAttempts = 0;
    ANY_LETTER = "(?:[^\\x00-\\x7F-]|\\$|\\w)";
    NumberSystem = [
      {
        radix: 2,
        prefix: "0b0*",
      },
      {
        radix: 8,
        prefix: "0+",
      },
      {
        radix: 10,
        prefix: "",
      },
      {
        radix: 16,
        prefix: "0x0*",
      },
    ];
    constructor(code) {
      ((this.code = code), (this.COPY_CODE = code));
    }
    isRegExp(regex) {
      return regex instanceof RegExp;
    }
    generateNumberSystem(int) {
      return `(?:${this.NumberSystem.map(({ radix: radix, prefix: prefix }) => prefix + int.toString(radix)).join("|")})`;
    }
    parseVariables(regex) {
      return (
        (regex = regex.replace(/{VAR}/g, "(?:let|var|const)")),
        (regex = regex.replace(/{QUOTE{(\w+)}}/g, "(?:'$1'|\"$1\"|`$1`)")),
        (regex = regex.replace(/NUM{(\d+)}/g, (...args) =>
          this.generateNumberSystem(Number(args[1])),
        )),
        (regex = regex.replace(/\\w/g, this.ANY_LETTER)),
        regex
      );
    }
    format(name, inputRegex, flags) {
      this.hookAttempts++;
      let regex = "";
      if (Array.isArray(inputRegex)) {
        regex = inputRegex
          .map((exp) => (this.isRegExp(exp) ? exp.source : exp))
          .join("\\s*");
      } else if (this.isRegExp(inputRegex)) {
        regex = inputRegex.source;
      } else {
        regex = inputRegex + "";
      }
      regex = this.parseVariables(regex);
      let expression = RegExp(regex, flags);
      if (!expression.test(this.code)) {
        Logger.error("Failed to find: " + name);
      } else {
        this.hookCount++;
      }
      return expression;
    }
    match(name, regex, flags) {
      let expression = this.format(name, regex, flags);
      return this.code.match(expression) || [];
    }
    replace(name, regex, substr, flags) {
      let expression = this.format(name, regex, flags);
      return ((this.code = this.code.replace(expression, substr)), expression);
    }
    insertAtIndex(index, str) {
      return (
        this.code.slice(0, index) +
        str +
        this.code.slice(index, this.code.length)
      );
    }
    template(name, regex, substr, getIndex) {
      let expression = this.format(name, regex),
        match = this.code.match(expression);
      if (match === null) {
        return;
      }
      let index = getIndex(match);
      this.code = this.insertAtIndex(
        index,
        substr.replace(/\$(\d+)/g, (...args) => match[args[1]]),
      );
    }
    append(name, regex, substr) {
      this.template(
        name,
        regex,
        substr,
        (match) => (match.index || 0) + match[0].length,
      );
    }
    prepend(name, regex, substr) {
      this.template(name, regex, substr, (match) => match.index || 0);
    }
    wrap(left, right) {
      this.code = left + this.code + right;
    }
  }

  const Regexer_default = Regexer;

  const formatCode2 = (code) => {
    let Hook = new Regexer_default(code);
    if (!isProd) {
      Hook.code = 'console.log("Loaded bundle..");' + Hook.code;
    }
    (Hook.append(
      "preRenderLoop",
      /\)\}\}\(\);function \w+\(\)\{/,
      "Atlantis.Renderer.preRender();",
    ),
      Hook.append(
        "postRenderLoop",
        /\w+,\w+\(\),requestAnimFrame\(\w+\)/,
        ";Atlantis.Renderer.postRender();",
      ),
      Hook.append(
        "mapPreRender",
        /(\w+)\.lineWidth=NUM{4};/,
        "Atlantis.Renderer.mapPreRender($1);",
      ),
      Hook.prepend(
        "gameInit",
        /function (\w+)\(\w+\)\{\w+\.\w+\(\w+,f/,
        "Atlantis.gameInit=function(a){$1(a);};",
      ),
      Hook.prepend(
        "LockRotationClient",
        /return \w+\?\(\!/,
        "return Atlantis.myClient.ModuleHandler.currentAngle;",
      ),
      Hook.replace("DisableResetMoveDir", /\w+=\{\},\w+\.send\("\w+"\)/, ""),
      Hook.append(
        "offset",
        /\W170\W.+?(\w+)=\w+\-\w+\/2.+?(\w+)=\w+\-\w+\/2;/,
        "Atlantis.myClient.myPlayer.offset.setXY($1,$2);",
      ),
      Hook.prepend(
        "renderEntity",
        /\w+\.health>NUM{0}.+?(\w+)\.fillStyle=(\w+)==(\w+)/,
        ";Atlantis.hooks.EntityRenderer.render($1,$2,$3);false&&",
      ),
      Hook.append(
        "renderItemPush",
        /,(\w+)\.blocker,\w+.+?2\)\)/,
        ",Atlantis.Renderer.renderObjects.push($1)",
      ),
      Hook.append(
        "renderItem",
        /70, 0.35\)",(\w+).+?\w+\)/,
        ",Atlantis.hooks.ObjectRenderer.render($1)",
      ),
      Hook.replace(
        "renderItemFadeAlpha",
        /(\w+)\.globalAlpha=(\w+)\.hideFromEnemy\?\.6:1,/
        ,
        "$1.globalAlpha=Atlantis.hooks.ObjectRenderer.getItemAlpha($2,$2.hideFromEnemy?.6:1),",
      ),
      Hook.append("RemoveSendAngle", /clientSendRate\)/, "&&false"),
      Hook.replace(
        "handleEquip",
        /\w+\.send\("\w+",0,(\w+),(\w+)\)/,
        "Atlantis.myClient.ModuleHandler.equip($2,$1,true,true)",
      ),
      Hook.replace(
        "handleBuy",
        /\w+\.send\("\w+",1,(\w+),(\w+)\)/,
        "Atlantis.myClient.ModuleHandler.buy($2,$1,true)",
      ),
      Hook.prepend("RemovePingCall", /\w+&&clearTimeout/, "return;"),
      Hook.append(
        "RemovePingState",
        /let \w+=-1;function \w+\(\)\{/,
        "return;",
      ),
      Hook.prepend(
        "preRender",
        /(\w+)\.lineWidth=NUM{4},/,
        "Atlantis.hooks.ObjectRenderer.preRender($1);",
      ),
      Hook.replace(
        "RenderGrid",
        /("#(?:91b2db|6f78c9)".+?)(for.+?)(\w+\.stroke)/,
        "$1$3",
      ),
      Hook.replace(
        "upgradeItem",
        /(upgradeItem.+?onclick.+?)\w+\.send\("\w+",(\w+)\)\}/,
        "$1Atlantis.myClient.ModuleHandler.upgradeItem($2)}",
      ));
    let data = Hook.match("DeathMarker", /99999.+?(\w+)=\{x:(\w+)/);
    (Hook.append(
      "playerDied",
      /NUM{99999};function \w+\(\)\{/,
      `if(Atlantis.settings._autospawn){${data[1]}={x:${data[2]}.x,y:${data[2]}.y};return};`,
    ),
      Hook.append(
        "updateNotificationRemove",
        /\w+=\[\],\w+=\[\];function \w+\(\w+,\w+\)\{/,
        "return;",
      ),
      Hook.replace(
        "checkTrusted",
        /checkTrusted:(\w+)/,
        "checkTrusted:(callback)=>(event)=>callback(event)",
      ),
      Hook.replace(
        "removeSkins",
        /(\(\)\{)(let \w+="";for\(let)/,
        "$1return;$2",
      ),
      Hook.prepend("unlockedItems", /\w+\.list\[\w+\]\.pre==/, "true||"),
      Hook.prepend(
        "renderPlayer",
        /function (\w+)\(\w+,\w+\)\{\w+=\w+\|\|\w+,/,
        "Atlantis.hooks.renderPlayer=$1;",
      ),
      Hook.replace("maskFRVR", /window\.FRVR/, "FRVR", "g"),
      Hook.replace(
        "scaleWidth",
        /=1920/,
        "=Atlantis.ZoomHandler.scale.smooth.w",
      ),
      Hook.replace(
        "scaleHeight",
        /=1080/,
        "=Atlantis.ZoomHandler.scale.smooth.h",
      ),
      Hook.replace(
        "maskLerp",
        /Math\.lerpAngle/,
        "THIS_STORAGE.lerpAngle",
        "g",
      ),
      Hook.replace(
        "smoothRendering",
        /(\w+=)NUM{170};/,
        "$1Atlantis._getSmoothRendering();",
      ));
    let addCode = isProd
      ? "const Atlantis=window.Atlantis;delete window.Atlantis;"
      : "";
    return (
      Hook.wrap(
        "(function THIS_STORAGE(){const FRVR=window.FRVR;delete window.FRVR;" +
        addCode,
        "})();",
      ),
      Logger.test(
        `Modified bundle, total amount of hooks: ${Hook.hookCount}/${Hook.hookAttempts}`,
      ),
      Hook.code
    );
  },
    formatCode_default = formatCode2;

  const Injector = new (class {
    init(node) {
      this.loadScript(node.src);
    }
    loadScript(src) {
      let xhr = new XMLHttpRequest();
      (xhr.open("GET", src, !1), xhr.send());
      let code = formatCode_default(xhr.responseText);
      if (isProd) {
        this.waitForBody(() => {
          Function(code)();
        });
      } else {
        let blob = new Blob([code], {
          type: "text/plain",
        }),
          element = document.createElement("script");
        ((element.src = URL.createObjectURL(blob)),
          this.waitForBody(() => {
            document.head.appendChild(element);
          }));
      }
    }
    waitForBody(callback) {
      if (document.readyState !== "loading") {
        (callback(), Logger.test("Page already loaded, instant inject.."));
        return;
      }
      document.addEventListener(
        "readystatechange",
        () => {
          if (document.readyState !== "loading") {
            callback();
          }
        },
        {
          once: !0,
        },
      );
    }
  })(),
    Injector_default = Injector;

  const resetGame = (loadedFast) => {
    let scriptExecuteHandler = (node) => {
      (node.addEventListener(
        "beforescriptexecute",
        (event) => {
          event.preventDefault();
        },
        {
          once: !0,
        },
      ),
        node.remove());
    },
      scriptBundle = null,
      handleScriptElement = (node) => {
        let isScript = node instanceof HTMLScriptElement,
          isLink = node instanceof HTMLLinkElement,
          regex = /frvr|jquery|howler|assets|cookie|securepubads|google|ads/i;
        if (
          (isScript && regex.test(node.src)) ||
          (isLink && regex.test(node.href)) ||
          regex.test(node.innerHTML)
        ) {
          scriptExecuteHandler(node);
        }
        if (
          isScript &&
          /assets.+\.js$/.test(node.src) &&
          scriptBundle === null
        ) {
          if (
            ((scriptBundle = node),
              Logger.test("Found script element, resolving.."),
              scriptExecuteHandler(node),
              loadedFast)
          ) {
            Injector_default.init(node);
          }
        }
      };
    (new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        for (let node of mutation.addedNodes) {
          if (
            node instanceof HTMLScriptElement ||
            node instanceof HTMLLinkElement
          ) {
            handleScriptElement(node);
          }
        }
      }
    }).observe(document, {
      childList: !0,
      subtree: !0,
    }),
      document.querySelectorAll("script").forEach(handleScriptElement),
      document.querySelectorAll("link").forEach(handleScriptElement),
      document.querySelectorAll("iframe").forEach((iframe) => {
        iframe.remove();
      }));
    let resolvePromise = (data) =>
      new Promise(function (resolve) {
        resolve(data);
      }),
      win = window;
    if (
      (blockProperty(win, "onbeforeunload"),
        (win.frvrSdkInitPromise = resolvePromise()),
        blockProperty(win, "frvrSdkInitPromise"),
        (win.FRVR = {
          bootstrapper: {
            complete() { return resolvePromise(); },
          },
          tracker: {
            levelStart() { },
          },
          ads: {
            show() {
              return resolvePromise();
            },
          },
          channelCharacteristics: {
            allowNavigation: !0,
          },
          setChannel() { },
        }),
        blockProperty(win, "FRVR"),
        !loadedFast)
    ) {
      let _define = win.customElements.define.bind(win.customElements);
      ((win.customElements.define = function () {
        win.customElements.define = _define;
      }),
        (win.requestAnimFrame = function () {
          if ((delete win.requestAnimFrame, scriptBundle !== null)) {
            Injector_default.init(scriptBundle);
          }
        }),
        blockProperty(win, "requestAnimFrame"));
    }
    let _fetch = window.fetch;
    if (
      ((window.fetch = new Proxy(_fetch, {
        apply(target, _this, args) {
          let link = args[0];
          if (typeof link === "string") {
            if (/ping/.test(link)) {
              return resolvePromise();
            }
          }
          return target.apply(_this, args);
        },
      })),
        CustomStorage.set("moofoll", 1),
        CustomStorage.get("skin_color") === null)
    ) {
      CustomStorage.set("skin_color", "toString");
    }
    window.addEventListener = new Proxy(window.addEventListener, {
      apply(target, _this, args) {
        if (["keydown", "keyup"].includes(args[0]) && args[2] === void 0) {
          if (args[0] === "keyup" && loadedFast) {
            window.addEventListener = target;
          }
          return null;
        }
        return target.apply(_this, args);
      },
    });
    let proto = HTMLDivElement.prototype;
    ((proto.addEventListener = new Proxy(proto.addEventListener, {
      apply(target, _this, args) {
        if (
          _this.id === "touch-controls-fullscreen" &&
          /^mouse/.test(args[0]) &&
          args[2] === !1
        ) {
          if (/up$/.test(args[0]) && loadedFast) {
            proto.addEventListener = target;
          }
          return null;
        }
        return target.apply(_this, args);
      },
    })),
      (window.setInterval = new Proxy(window.setInterval, {
        apply(target, _this, args) {
          if (/cordova/.test(args[0].toString()) && args[1] === 1e3) {
            if (loadedFast) {
              window.setInterval = target;
            }
            return null;
          }
          return target.apply(_this, args);
        },
      })));
    let deleteProp = (target, name) => {
      delete target[name];
    };
    (Hooker_default.createRecursiveHook(
      window,
      "config",
      (that, config) => (
        deleteProp(that, "openLink"),
        deleteProp(that, "aJoinReq"),
        deleteProp(that, "follmoo"),
        deleteProp(that, "kickFromClan"),
        deleteProp(that, "sendJoin"),
        deleteProp(that, "leaveAlliance"),
        deleteProp(that, "createAlliance"),
        deleteProp(that, "storeBuy"),
        deleteProp(that, "storeEquip"),
        deleteProp(that, "showItemInfo"),
        deleteProp(that, "selectSkinColor"),
        deleteProp(that, "config"),
        deleteProp(that, "altchaCreateWorker"),
        deleteProp(that, "captchaCallbackHook"),
        deleteProp(that, "showPreAd"),
        deleteProp(that, "setUsingTouch"),
        that.addEventListener("blur", that.onblur),
        deleteProp(that, "onblur"),
        that.addEventListener("focus", that.onfocus),
        deleteProp(that, "onfocus"),
        (Atlantis.config = config),
        loadedFast
      ),
    ),
      Hooker_default.createRecursiveHook(
        Object.prototype,
        "initialBufferSize",
        (_this) => ((client.PacketManager.Encoder = _this), !0),
      ),
      Hooker_default.createRecursiveHook(
        Object.prototype,
        "maxExtLength",
        (_this) => ((client.PacketManager.Decoder = _this), !0),
      ));
    let _proto_ = Object.prototype;
    Object.defineProperty(_proto_, "processServers", {
      set(value) {
        (delete _proto_.processServers,
          (this.processServers = function (data) {
            for (let server of data) {
              server.playerCapacity += 1;
            }
            return value.call(this, data);
          }));
      },
      configurable: !0,
    });
  },
    resetGame_default = resetGame;

  class DeadPlayer {
    moveAngle;
    skinColor;
    angle;
    weapon;
    variant;
    hatID;
    accID;
    rotation;
    baseTime = 2e3;
    elapsedTime = 0;
    pos = new Vector_default();
    lerpPos = new Vector_default();
    acc = 7;
    velocity = 0;
    opacity = 1;
    shortSign;
    constructor(
      startPos,
      moveAngle,
      skin,
      rotation,
      weapon,
      variant,
      hatID,
      accID,
      impulse,
    ) {
      ((this.moveAngle = moveAngle),
        (this.skinColor = skin),
        (this.angle = rotation),
        (this.weapon = weapon),
        (this.variant = variant),
        (this.hatID = hatID),
        (this.accID = accID),
        (this.rotation = rotation),
        this.pos.setVec(startPos),
        this.lerpPos.setVec(startPos),
        (this.shortSign = Math.sign(shortAngle(this.angle, this.moveAngle))),
        (this.acc = ((impulse || 10) / 10) * 75));
    }
    update(delta) {
      this.elapsedTime += delta;
      let progress = Math.min(this.elapsedTime / this.baseTime, 1),
        easedProgress = easeOutQuad(progress);
      this.opacity = 1 - easedProgress;
      let dt = delta / 1e3,
        blend = 1 - Math.exp(-10 * dt),
        PI3 = Math.PI,
        rotationSpeed = ((1 - easedProgress) / PI3) * blend;
      ((this.rotation += rotationSpeed * this.shortSign),
        (this.velocity = this.acc * (1 - easedProgress)),
        this.pos.add(
          Vector_default.fromAngle(this.moveAngle, this.velocity * dt),
        ),
        (this.lerpPos.x = lerp(this.lerpPos.x, this.pos.x, blend)),
        (this.lerpPos.y = lerp(this.lerpPos.y, this.pos.y, blend)));
    }
    isFinished() {
      return this.elapsedTime >= this.baseTime;
    }
  }

  const DeadPlayerHandler = new (class {
    deadPlayers = new Set();
    start = Date.now();
    add(player) {
      this.deadPlayers.add(player);
    }
    update(ctx) {
      let now = Date.now(),
        delta = now - this.start;
      this.start = now;
      let offset = client.myPlayer.offset;
      for (let player of this.deadPlayers) {
        if (
          (player.update(delta),
            ctx.save(),
            ctx.translate(
              player.lerpPos.x - offset.x,
              player.lerpPos.y - offset.y,
            ),
            ctx.rotate(player.rotation),
            (ctx.globalAlpha = player.opacity),
            (ctx.strokeStyle = "#525252"),
            Atlantis.hooks.renderPlayer(
              {
                weaponIndex: player.weapon,
                buildIndex: -1,
                tailIndex: player.accID,
                skinIndex: player.hatID,
                weaponVariant: player.variant,
                skinColor: player.skinColor,
                scale: 35,
              },
              ctx,
            ),
            ctx.restore(),
            player.isFinished())
        ) {
          this.deadPlayers.delete(player);
        }
      }
    }
  })();

  const ObjectRenderer = new (class {
    itemFadeStates = new Map();
    fadeFrame = 0;
    getFadeKey(entity) {
      return entity.sid ?? entity.id ?? `${entity.x}|${entity.y}|${entity.name ?? "item"}`;
    }
    getItemAlpha(entity, baseAlpha = 1) {
      let key = this.getFadeKey(entity),
        now = performance.now(),
        state = this.itemFadeStates.get(key);
      if (state === void 0) {
        state = { start: now, lastSeen: this.fadeFrame };
        this.itemFadeStates.set(key, state);
      }
      state.lastSeen = this.fadeFrame;
      let progress = Math.min(1, (now - state.start) / 240),
        eased = 1 - Math.pow(1 - progress, 3);
      return baseAlpha * (0.08 + eased * 0.92);
    }
    renderStarShape(ctx, x, y, outer, inner, spikes, color, alpha = 1) {
      ctx.save();
      ctx.translate(x - client.myPlayer.offset.x, y - client.myPlayer.offset.y);
      ctx.beginPath();
      let rot = (Math.PI / 2) * 3,
        step = Math.PI / spikes;
      ctx.moveTo(0, -outer);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(Math.cos(rot) * outer, Math.sin(rot) * outer);
        rot += step;
        ctx.lineTo(Math.cos(rot) * inner, Math.sin(rot) * inner);
        rot += step;
      }
      ctx.closePath();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }
    renderNature(ctx, entity, object) {
      if (!(object instanceof Resource)) {
        return;
      }
      let x = entity.x + entity.xWiggle,
        y = entity.y + entity.yWiggle;
      if (object.type === 0) {
        Renderer_default.fillCircle(ctx, x, y, object.scale * 0.34, "#7c4f28", 0.9);
        Renderer_default.fillCircle(ctx, x, y - object.scale * 0.18, object.scale * 0.52, "#2f8f5b", 0.22);
        Renderer_default.fillCircle(ctx, x - object.scale * 0.16, y - object.scale * 0.1, object.scale * 0.22, "#89c76b", 0.55);
        Renderer_default.fillCircle(ctx, x + object.scale * 0.14, y - object.scale * 0.18, object.scale * 0.18, "#9fda74", 0.5);
      } else if (object.type === 1) {
        if (object.isCactus) {
          Renderer_default.fillCircle(ctx, x, y, object.scale * 0.45, "#3aa66b", 0.28);
          Renderer_default.fillCircle(ctx, x, y, object.scale * 0.2, "#7ddc8d", 0.45);
        } else {
          this.renderStarShape(ctx, x, y, object.scale * 0.32, object.scale * 0.22, 7, "#78af52", 0.5);
          Renderer_default.fillCircle(ctx, x, y, object.scale * 0.18, "#a5d46a", 0.55);
        }
      }
    }
    renderSpikeAccent(ctx, entity, object) {
      if (!(object instanceof PlayerObject) || object.itemGroup !== 2) {
        return;
      }
      let x = entity.x + entity.xWiggle,
        y = entity.y + entity.yWiggle,
        ownerSid = object.owner?.sid ?? object.ownerID,
        isMine = typeof ownerSid === "number" && client.myPlayer.isMyPlayerByID(ownerSid),
        isTeam =
          typeof ownerSid === "number" &&
          !isMine &&
          client.myPlayer.isTeammateByID(ownerSid),
        spikeColor = isMine || isTeam ? "#86A7D8" : "#D99292",
        tips = object.type === 7 ? 5 : 6,
        coreScale = object.scale * 0.6;
      this.renderStarShape(ctx, x, y, object.scale, coreScale, tips, spikeColor, 0.38);
      Renderer_default.fillCircle(ctx, x, y, coreScale * 0.58, "#a5974c", 0.8);
      Renderer_default.fillCircle(ctx, x, y, coreScale * 0.28, "#c9b758", 0.9);
    }
    healthBar(ctx, entity, object) {
      if (
        !(
          Settings_default._itemHealthBar &&
          object.seenPlacement &&
          object.isDestroyable
        )
      ) {
        return 0;
      }
      let { health: health, maxHealth: maxHealth, angle: angle } = object,
        perc = health / maxHealth,
        color = Settings_default._itemHealthBarColor;
      return Renderer_default.circularBar(ctx, entity, perc, angle, color);
    }
    renderTurret(ctx, entity, object, scale) {
      if (object.type !== 17) {
        return;
      }
      if (Settings_default._objectTurretReloadBar) {
        let { reload: reload, maxReload: maxReload, angle: angle } = object,
          perc = reload / maxReload,
          color = Settings_default._objectTurretReloadBarColor;
        Renderer_default.circularBar(ctx, entity, perc, angle, color, scale);
      }
    }
    renderWindmill(entity) {
      if (Items[entity.id].itemType === 5) {
        entity.turnSpeed = 0;
      }
    }
    renderCollisions(ctx, entity, object) {
      let x = entity.x + entity.xWiggle,
        y = entity.y + entity.yWiggle;
      if (Settings_default._collisionHitbox) {
        (Renderer_default.circle(
          ctx,
          x,
          y,
          object.collisionScale,
          "#c7fff2",
          0.5,
          1,
        ),
          Renderer_default.rect(
            ctx,
            new Vector_default(x, y),
            object.collisionScale,
            "#ecffbd",
            1,
            0.5,
          ));
      }
      if (Settings_default._weaponHitbox) {
        Renderer_default.circle(
          ctx,
          x,
          y,
          object.hitScale,
          "#3f4ec4",
          0.5,
          1,
        );
      }
      if (Settings_default._placementHitbox) {
        Renderer_default.circle(
          ctx,
          x,
          y,
          object.placementScale,
          "#7f86d8",
          0.5,
          1,
        );
      }
      let spikeCollider = client.EnemyManager.spikeCollider;
      if (spikeCollider === object) {
        let scale = spikeCollider.scale * 0.3;
        let ownerSid = object.owner?.sid,
          isMine = typeof ownerSid === "number" && myPlayer.isMyPlayerByID(ownerSid),
          isTeam =
            typeof ownerSid === "number" &&
            !isMine &&
            myPlayer.isTeammateByID(ownerSid),
          spikeColor = isMine || isTeam ? "#86A7D8" : "#D99292";
        Renderer_default.fillCircle(ctx, x, y, scale, spikeColor, 0.6);
      }
      if (object instanceof PlayerObject && object.canBeDestroyed) {
        Renderer_default.fillCircle(ctx, x, y, 10, "#f88a41ff", 0.3);
      }
    }
    render(ctx) {
      if (Renderer_default.renderObjects.length === 0) {
        return;
      }
      this.fadeFrame++;
      if (this.fadeFrame % 30 === 0) {
        for (let [key, state] of this.itemFadeStates) {
          if (this.fadeFrame - state.lastSeen > 2) {
            this.itemFadeStates.delete(key);
          }
        }
      }
      let {
        ObjectManager: ObjectManager2,
        ModuleHandler: ModuleHandler2,
        myPlayer: myPlayer,
      } = client;
      for (let entity of Renderer_default.renderObjects) {
        let object = ObjectManager2.objects.get(entity.sid);
        if (object === void 0) {
          continue;
        }
        if (object instanceof PlayerObject) {
          let scale = this.healthBar(ctx, entity, object);
          (this.renderTurret(ctx, entity, object, scale),
            this.renderWindmill(entity));
        }
        this.renderCollisions(ctx, entity, object);
      }
      Renderer_default.renderObjects.length = 0;
    }
    volcanoBoxSize = 940;
    volcanoAggressionRadius = 1440;
    volcanoBoxPos = new Vector_default(14400, 14400).sub(this.volcanoBoxSize);
    volcanoPos = new Vector_default(13960, 13960);
    preRender(ctx) {
      if (
        (Renderer_default.rect(
          ctx,
          this.volcanoBoxPos,
          this.volcanoBoxSize,
          "red",
          1,
          0.5,
        ),
          Renderer_default.circle(
            ctx,
            this.volcanoPos.x,
            this.volcanoPos.y,
            this.volcanoAggressionRadius,
            "red",
            1,
            0.4,
          ),
          client.myPlayer.diedOnce)
      ) {
        let { x: x, y: y } = client.myPlayer.deathPosition;
        Renderer_default.cross(ctx, x, y, 50, 15, "#a56bff");
      }
      DeadPlayerHandler.update(ctx);
    }
  })(),
    ObjectRenderer_default = ObjectRenderer;

  const isProd = !0;

  const loadedFast = document.head === null;

  if (!loadedFast) {
    Logger.warn(
      "Atlantis loading warning! It is generally recommended to use faster injection mode.",
    );
  }

  Logger.test("Atlantis initialization..");

  const gameToken = altcha.generate(),
    client = new PlayerClient_default();

  window.WebSocket = new window.Proxy(window.WebSocket, {
    construct(target, args) {
      let socket = new target(...args);
      return (
        Logger.test("Found socket! Socket initialization.."),
        client.SocketManager.init(socket),
        (window.WebSocket = target),
        socket
      );
    },
  });

  const win = window,
    Atlantis = {
      myClient: client,
      settings: Settings_default,
      Renderer: Renderer_default,
      DataHandler: DataHandler_default,
      ZoomHandler: ZoomHandler_default,
      hooks: {
        EntityRenderer: EntityRenderer_default,
        ObjectRenderer: ObjectRenderer_default,
        renderPlayer: function () { },
        showText: function () { },
      },
      _getSmoothRendering() {
        return Settings_default._smoothRendering;
      },
      version: "1.5",
      hash: "{HASH}",
      config: {},
      gameInit(token) { },
      async startGame() {
        this.gameInit(await gameToken);
      },
    };

  win.Atlantis = Atlantis;

  resetGame_default(loadedFast);

  const contentLoaded = () => {
    (Logger.test("Menu initialization.."),
      client.InputHandler.init(),
      GameUI_default.init(),
      UI_default.init(),
      StoreHandler_default.init());
    let nightOverlay = document.querySelector("#Atlantis-night-overlay");
    if (!nightOverlay) {
      nightOverlay = document.createElement("div");
      nightOverlay.id = "Atlantis-night-overlay";
      nightOverlay.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:2;background:rgba(5, 0, 49, 0.36);";
      document.body.appendChild(nightOverlay);
    }
  };

  window.addEventListener("DOMContentLoaded", contentLoaded);

  if (document.readyState !== "loading") {
    contentLoaded();
  }

  const onload = () => {
    Logger.test("Page loaded..");
    let { enterGame: enterGame } = GameUI_default.getElements();
    enterGame.classList.remove("disabled");
  };

  window.addEventListener("load", onload);

  if (document.readyState === "complete") {
    onload();
  }
})();
