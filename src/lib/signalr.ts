'use client';
import * as signalR from '@microsoft/signalr';

export function createHub(url: string, tokenFactory: () => Promise<string | undefined>) {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(url, {
      accessTokenFactory: async () => (await tokenFactory()) || '',
    })
    .withAutomaticReconnect()
    .build();
  return connection;
}