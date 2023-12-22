---@param shouldShow boolean
local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendSolidMessage('setVisible', shouldShow)
end

RegisterCommand('show-nui', function()
  toggleNuiFrame(true)
end, false)

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  cb({})
end)

RegisterNUICallback('getClientData', function(data, cb)
  local coords = GetEntityCoords(PlayerPedId())

  cb({
    x = coords.x,
    y = coords.y,
    z = coords.z
  })
end)